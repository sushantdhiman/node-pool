"use strict";

const tap = require("tap");
const { Pool, TimeoutError } = require("../..");
const { ResourceFactory, delay } = require("../utils");

tap.test("pool expands only to max limit", t => {
  const resourceFactory = new ResourceFactory();

  const factory = {
    name: "test1",
    create: resourceFactory.create.bind(resourceFactory),
    destroy: resourceFactory.destroy.bind(resourceFactory),
    validate: resourceFactory.validate.bind(resourceFactory),
    max: 1,
    min: 0,
    idleTimeoutMillis: 100,
    acquireTimeoutMillis: 100
  };

  const pool = new Pool(factory);

  pool
    .acquire()
    .then(obj => {
      return pool.acquire().catch(e => {
        t.ok(e instanceof TimeoutError);
        t.ok(e.message === "Operation timeout");
        pool.release(obj);
        t.end();
      });
    })
    .catch(t.threw);
});

tap.test("pool uses LIFO", t => {
  const resourceFactory = new ResourceFactory();

  const factory = {
    name: "test1",
    create: resourceFactory.create.bind(resourceFactory),
    destroy: resourceFactory.destroy.bind(resourceFactory),
    validate: resourceFactory.validate.bind(resourceFactory),
    max: 2,
    min: 0,
    idleTimeoutMillis: 100,
    acquireTimeoutMillis: 100
  };

  const pool = new Pool(factory);

  pool.acquire().then(clientA => {
    pool.acquire().then(clientB => {
      pool.release(clientA);
      pool.release(clientB);

      pool.acquire().then(clientC => {
        t.equal(clientB, clientC);
        t.end();
      });
    });
  });
});

tap.test("removes correct object on reap", t => {
  const resourceFactory = new ResourceFactory();

  const pool = new Pool({
    name: "test3",
    create: resourceFactory.create.bind(resourceFactory),
    destroy: resourceFactory.destroy.bind(resourceFactory),
    validate: resourceFactory.validate.bind(resourceFactory),
    max: 2,
    min: 0
  });

  pool.acquire().then(client => {
    // should be removed second
    setTimeout(() => {
      pool.destroy(client);
    }, 5);
  });

  pool.acquire().then(client => {
    // should be removed first
    pool.destroy(client);
  });

  setTimeout(() => {
    t.equal(1, resourceFactory.bin[0].id);
    t.equal(0, resourceFactory.bin[1].id);
    t.end();
  }, 100);
});

tap.test("drains", t => {
  const count = 5;
  let acquired = 0;

  const resourceFactory = new ResourceFactory();

  const pool = new Pool({
    name: "test4",
    create: resourceFactory.create.bind(resourceFactory),
    destroy: resourceFactory.destroy.bind(resourceFactory),
    validate: resourceFactory.validate.bind(resourceFactory),
    max: 2,
    min: 0,
    idleTimeoutMillis: 10000
  });

  // request 5 resources that release after 250ms
  for (let i = 0; i < count; i++) {
    pool.acquire().then(client => {
      acquired += 1;
      t.equal(typeof client.id, "number");
      setTimeout(() => {
        pool.destroy(client);
      }, 250);
    });
  }

  // ensure there are objects in pending queue
  // so drain can clear both pending and in-use queues
  t.notEqual(count, acquired);

  pool
    .drain()
    .then(() => {
      t.equal(count, acquired);
      t.equal(pool.available, 0);
      t.equal(pool.waiting, 0);
      t.equal(pool.using, 0);

      return pool.acquire().catch(e => {
        t.ok(e.message === "pool is draining and cannot accept work");
        t.end();
      });
    })
    .catch(t.threw);
});

tap.test("logging", t => {
  const logLevels = { verbose: 0, info: 1, warn: 2, error: 3 };
  const logMessages = { verbose: [], info: [], warn: [], error: [] };
  const resourceFactory = new ResourceFactory();

  const factory = {
    name: "test12",
    create: resourceFactory.create.bind(resourceFactory),
    destroy: () => {},
    validate: () => {},
    max: 2,
    min: 0,
    idleTimeoutMillis: 100,
    log: function(msg, level) {
      testlog(msg, level);
    }
  };
  const testlog = function(msg, level) {
    t.ok(level in logLevels);
    logMessages[level].push(msg);
  };

  const pool = new Pool(factory);
  const pool2 = new Pool({
    name: "testNoLog",
    create: resourceFactory.create.bind(resourceFactory),
    destroy: () => {},
    validate: () => {},
    max: 2,
    min: 0,
    idleTimeoutMillis: 100
  });

  t.equal(pool2.name, "testNoLog");

  pool
    .acquire()
    .then(() => {
      t.equal(
        logMessages.verbose[0],
        "createResource() - creating obj - count=1 min=0 max=2"
      );
      t.equal(logMessages.info[0], "dispense() clients=1 available=0");
      t.end();
    })
    .catch(t.threw);
});

tap.test("removes from available objects on destroy", t => {
  let destroyCalled = false;
  const factory = {
    name: "test13",
    create: function() {
      return Promise.resolve({});
    },
    destroy: function() {
      destroyCalled = true;
    },
    validate: () => {},
    max: 2,
    min: 0,
    idleTimeoutMillis: 100
  };

  const pool = new Pool(factory);

  pool
    .acquire()
    .then(obj => {
      pool.destroy(obj);
    })
    .then(() => {
      t.equal(destroyCalled, true);
      t.equal(pool.available, 0);
      t.equal(pool.using, 0);
      t.equal(pool.waiting, 0);
      t.end();
    });
});

tap.test(
  "decrement _count only when resource is actually removed from queues",
  t => {
    let destroyCalled = 0;
    const factory = {
      name: "test14",
      create: function() {
        return Promise.resolve({});
      },
      destroy: function() {
        destroyCalled++;
      },
      validate: () => {},
      max: 2,
      min: 0,
      idleTimeoutMillis: 100
    };

    const pool = new Pool(factory);

    Promise.all([pool.acquire(), pool.acquire()])
      .then(([resource1, resource2]) => {
        t.equal(pool.available, 0);
        t.equal(pool.using, 2);
        t.equal(pool.waiting, 0);
        t.equal(pool.size, 2);

        pool.destroy(resource1);
        pool.destroy(resource1);
        pool.destroy(resource1);
        pool.destroy(resource1);

        t.equal(destroyCalled, 1);
        t.equal(pool.available, 0);
        t.equal(pool.using, 1);
        t.equal(pool.waiting, 0);
        t.equal(pool.size, 1);

        pool.destroy(resource2);
        pool.destroy(resource2);
        pool.destroy(resource2);
        pool.destroy(resource2);

        t.equal(destroyCalled, 2);
        t.equal(pool.available, 0);
        t.equal(pool.using, 0);
        t.equal(pool.waiting, 0);
        t.equal(pool.size, 0);

        t.end();
      })
      .catch(t.threw);
  }
);

tap.test("removes from available objects on validation failure", t => {
  let destroyCalled = 0;
  let validateCalled = 0;
  let destroyedClient = null;
  let count = 0;

  const factory = {
    name: "test15",
    create: () => {
      return Promise.resolve({ count: count++ });
    },
    destroy: client => {
      destroyCalled++;
      destroyedClient = client;
    },
    validate: client => {
      validateCalled++;
      return client.count > 0;
    },
    max: 2,
    min: 0,
    idleTimeoutMillis: 100
  };

  const pool = new Pool(factory);

  pool
    .acquire()
    .then(obj => {
      pool.release(obj);
      t.equal(obj.count, 0);

      return pool.acquire().then(obj => {
        pool.release(obj);
        t.equal(obj.count, 1);
      });
    })
    .then(() => {
      t.equal(validateCalled, 1);

      t.equal(destroyCalled, 1);
      t.equal(destroyedClient.count, 0); // destroy is called on first released client
      t.equal(pool.available, 1);

      t.end();
    })
    .catch(t.threw);
});

tap.test("acquire resolves after some failures", t => {
  let rejected = 0;

  const factory = {
    name: "test17",
    create: function() {
      rejected++;

      if (rejected <= 2) {
        return Promise.reject(new Error("Create error"));
      } else {
        return Promise.resolve({});
      }
    },
    destroy: () => {},
    validate: () => {},
    max: 1,
    min: 0
  };

  const pool = new Pool(factory);

  Promise.resolve()
    .then(() => t.rejects(pool.acquire(), new Error("Create error")))
    .then(() => t.rejects(pool.acquire(), new Error("Create error")))
    .then(() => pool.acquire())
    .then(() => {
      t.equal(pool.available, 0);
      t.end();
    })
    .catch(t.threw);
});

tap.test("returns only valid object to the pool", t => {
  const pool = new Pool({
    name: "test18",
    create: function() {
      return delay(1).then(() => ({ id: "validId" }));
    },
    destroy: () => {},
    validate: () => {},
    max: 1,
    min: 0,
    idleTimeoutMillis: 100
  });

  pool
    .acquire()
    .then(obj => {
      t.equal(pool.available, 0);
      t.equal(pool.using, 1);

      // Invalid release
      pool.release({});
      t.equal(pool.available, 0);
      t.equal(pool.using, 1);

      // Valid release
      pool.release(obj);
      t.equal(pool.available, 1);
      t.equal(pool.using, 0);

      t.end();
    })
    .catch(t.threw);
});

tap.test(
  "destroyAllNow should call factory.destroy for resources being removed",
  t => {
    let destroyCalled = 0;
    const factory = {
      name: "test19",
      create: function() {
        return Promise.resolve({});
      },
      destroy: function() {
        destroyCalled++;
      },
      validate: () => {},
      max: 2,
      min: 0,
      idleTimeoutMillis: 100
    };

    const pool = new Pool(factory);

    Promise.all([pool.acquire(), pool.acquire()])
      .then(([resource1, resource2]) => {
        t.equal(destroyCalled, 0);
        t.equal(pool.available, 0);
        t.equal(pool.using, 2);
        t.equal(pool.waiting, 0);
        t.equal(pool.size, 2);

        pool.release(resource1);
        pool.release(resource2);

        t.equal(destroyCalled, 0);
        t.equal(pool.available, 2);
        t.equal(pool.using, 0);
        t.equal(pool.waiting, 0);
        t.equal(pool.size, 2);

        return pool.destroyAllNow();
      })
      .then(() => {
        t.equal(destroyCalled, 2);
        t.equal(pool.available, 0);
        t.equal(pool.using, 0);
        t.equal(pool.waiting, 0);
        t.equal(pool.size, 0);

        t.end();
      })
      .catch(t.threw);
  }
);
