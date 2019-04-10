"use strict";

const tap = require("tap");
const Pool = require("../..").Pool;
const { delay } = require("../utils");

tap.test("factory.create", t => {
  tap.test("handle creation errors", t => {
    let created = 0;
    const pool = new Pool({
      name: "test-create-errors",
      create: function() {
        if (created++ < 5) {
          return Promise.reject(new Error(`Error ${created} occurred.`));
        } else {
          return Promise.resolve({ id: created });
        }
      },
      destroy: () => {},
      validate: () => {},
      max: 1,
      min: 0,
      idleTimeoutMillis: 1000
    });

    const tests = [];

    // ensure that creation errors do not populate the pool.
    for (let i = 1; i <= 5; i++) {
      tests.push(t.rejects(pool.acquire(), new Error(`Error ${i} occurred.`)));
    }

    tests.push(t.resolveMatch(pool.acquire(), { id: 6 }));

    Promise.all(tests)
      .then(() => {
        t.equal(pool.waiting, 0);
        t.end();
      })
      .catch(t.threw);
  });

  tap.test("handle creation errors from delayed creates", t => {
    let created = 0;
    const pool = new Pool({
      name: "test-async-create-errors",
      create: function() {
        if (created++ < 5) {
          return delay(10).then(() =>
            Promise.reject(new Error("Error occurred."))
          );
        } else {
          return delay(10).then(() => Promise.resolve({ id: created }));
        }
      },
      destroy: () => {},
      validate: () => {},
      max: 1,
      min: 0,
      idleTimeoutMillis: 1000
    });

    // FIXME: this section no longer proves anything as factory
    // errors no longer bubble up through the acquire call
    // we need to make the Pool an Emitter

    const tests = [];

    // ensure that creation errors do not populate the pool.
    for (let i = 0; i < 5; i++) {
      tests.push(t.rejects(pool.acquire(), new Error(`Error occurred.`)));
    }

    tests.push(t.resolveMatch(pool.acquire(), { id: 6 }));

    Promise.all(tests)
      .then(() => {
        t.equal(pool.waiting, 0);
        t.end();
      })
      .catch(t.threw);
  });

  t.end();
});
