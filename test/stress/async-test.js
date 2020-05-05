const tap = require("tap");
const Pool = require("../..").Pool;
const { delay } = require("../utils");

tap.test("async multiple calls", (t) => {
  let createCount = 0;

  const pool = new Pool({
    name: "test",
    create: function () {
      return delay(50).then(() => {
        createCount += 1;
        return Promise.resolve({ id: createCount });
      });
    },
    validate: () => true,
    destroy: () => {},
    max: 3,
    min: 0,
    idleTimeoutMillis: 100,
    log: false,
  });

  const borrowedObjects = [];

  const acquireRelease = function (
    num,
    inUseCount,
    availableCount,
    releaseTimeout
  ) {
    releaseTimeout = releaseTimeout || 100;
    inUseCount = inUseCount === undefined ? 0 : inUseCount;
    availableCount = availableCount === undefined ? 0 : availableCount;

    //console.log("Request " + num + " - available " + pool.available);
    return pool.acquire().then((obj) => {
      // check we haven't already borrowed this before:
      t.equal(
        borrowedObjects.indexOf(obj),
        -1,
        "acquire returned an object is currently acquired"
      );
      borrowedObjects.push(obj);

      //console.log("Acquire " + num + " - object id:", obj.id);
      t.ok(createCount <= 3);

      return delay(releaseTimeout).then(() => {
        const pos = borrowedObjects.indexOf(obj);
        borrowedObjects.splice(pos, 1);

        //console.log("Release " + num + " - object id:", obj.id);
        pool.release(obj);
      });
    });
  };

  Promise.all([
    acquireRelease(1, 1),
    acquireRelease(2, 2),
    acquireRelease(3),
    acquireRelease(4),
    acquireRelease(5),
    acquireRelease(6),
    acquireRelease(7),
    acquireRelease(8, 3, 0, 50),
    acquireRelease(9, 3, 0, 50),
    acquireRelease(10, 3, 0, 50),
    acquireRelease(11),
    acquireRelease(12),
  ])
    .then(() => pool.drain())
    .then(() => {
      t.end();
    })
    .catch(t.threw);
});
