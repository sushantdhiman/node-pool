"use strict";

const tap = require("tap");
const Promise = require("bluebird");
const Pool = require("../..").Pool;
const random = () => Math.floor(Math.random() * 1000);

tap.test("pool.name", t => {
  const pool = new Pool({
    name: "test-pool.name",
    create: () => Promise.resolve({ id: random() }),
    destroy: () => {},
    validate: () => true,
    max: 2,
    min: 0
  });

  t.ok(pool.name === "test-pool.name");
  t.end();
});

tap.test("pool.size", t => {
  const pool = new Pool({
    name: "test-pool.size",
    create: () => Promise.resolve({ id: random() }),
    destroy: () => {},
    validate: () => true,
    max: 2,
    min: 0,
    idleTimeoutMillis: 100
  });

  t.equal(pool.size, 0);

  pool
    .acquire()
    .then(obj1 => {
      t.equal(pool.size, 1);

      return pool.acquire().then(obj2 => {
        t.equal(pool.size, 2);

        pool.release(obj1);
        pool.release(obj2);

        return pool.acquire();
      });
    })
    .then(obj3 => {
      t.equal(pool.size, 2);
      pool.release(obj3);
    })
    .then(t.end)
    .catch(t.threw);
});

tap.test("pool.available", t => {
  const pool = new Pool({
    name: "test-pool.available",
    create: () => Promise.resolve({ id: random() }),
    destroy: () => {},
    validate: () => true,
    max: 2,
    min: 0,
    idleTimeoutMillis: 100
  });

  t.equal(pool.available, 0);

  pool
    .acquire()
    .then(obj1 => {
      t.equal(pool.available, 0);

      return pool.acquire().then(obj2 => {
        t.equal(pool.available, 0);

        pool.release(obj1);
        t.equal(pool.available, 1);

        pool.release(obj2);
        t.equal(pool.available, 2);

        return pool.acquire();
      });
    })
    .then(obj3 => {
      t.equal(pool.available, 1);
      pool.release(obj3);
      t.equal(pool.available, 2);
    })
    .then(t.end)
    .catch(t.threw);
});
