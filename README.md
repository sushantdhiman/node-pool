# sequelize-pool

[![npm](https://img.shields.io/npm/v/sequelize-pool.svg?style=flat-square)](https://www.npmjs.com/package/sequelize-pool)
[![Travis (.org)](https://img.shields.io/travis/com/sequelize/sequelize-pool.svg?style=flat-square)](https://travis-ci.com/sequelize/sequelize-pool)

Resource pool. Can be used to reuse or throttle expensive resources such as
database connections.

This is a fork from [generic-pool@v2.5](https://github.com/coopernurse/node-pool/tree/v2.5).

## Installation

```sh
npm i sequelize-pool
yarn add sequelize-pool
```

## Example

### Step 1 - Create pool using a factory object

```js
// Create a MySQL connection pool
var Pool = require("sequelize-pool").Pool;
var mysql2 = require("mysql2/promise");

var pool = new Pool({
  name: "mysql",
  create: function () {
    // return Promise
    return mysql2.createConnection({
      user: "scott",
      password: "tiger",
      database: "mydb",
    });
  },
  destroy: function (client) {
    client.end();
  },
  max: 10,
  // optional. if you set this, make sure to drain() (see step 3)
  min: 2,
  // Delay in milliseconds after which available resources in the pool will be destroyed.
  idleTimeoutMillis: 30000,
  // Delay in milliseconds after which pending acquire request in the pool will be rejected.
  acquireTimeoutMillis: 30000,
  // optional. if you set this, the resource will be destroyed and replaced after it has been used
  // `maxUses` number of times, which can help with re-balancing when pool members are added after
  // the process has started and already filled the pool with healthy connections.  See below for details.
  maxUses: 7200,
  // Function, defaults to console.log
  log: true,
});
```

### Step 2 - Use pool in your code to acquire/release resources

```js
// acquire connection
pool.acquire().then((connection) => {
  client.query("select * from foo", [], function () {
    // return object back to pool
    pool.release(client);
  });
});
```

### Step 3 - Drain pool during shutdown (optional)

If you are shutting down a long-lived process, you may notice
that node fails to exit for 30 seconds or so. This is a side
effect of the idleTimeoutMillis behaviour -- the pool has a
setTimeout() call registered that is in the event loop queue, so
node won't terminate until all resources have timed out, and the pool
stops trying to manage them.

This behaviour will be more problematic when you set factory.min > 0,
as the pool will never become empty, and the setTimeout calls will
never end.

In these cases, use the pool.drain() function. This sets the pool
into a "draining" state which will gracefully wait until all
idle resources have timed out. For example, you can call:

```js
// Only call this once in your application -- at the point you want
// to shutdown and stop using this pool.
pool.drain().then(() => pool.destroyAllNow());
```

If you do this, your node process will exit gracefully.

## Draining

If you know would like to terminate all the resources in your pool before
their timeouts have been reached, you can use `destroyAllNow()` in conjunction
with `drain()`:

```js
pool.drain().then(() => pool.destroyAllNow());
```

One side-effect of calling `drain()` is that subsequent calls to `acquire()`
will throw an Error.

## Pool info

The following functions will let you get information about the pool:

```js
// returns factory.name for this pool
pool.name;

// returns number of resources in the pool regardless of
// whether they are free or in use
pool.size;

// returns number of unused resources in the pool
pool.available;

// returns number of callers waiting to acquire a resource
pool.waiting;

// returns number of maxixmum number of resources allowed by pool
pool.maxSize;

// returns number of minimum number of resources allowed by pool
pool.minSize;
```

## Using `maxUses` option

Imagine a scenario where you have 10 app servers (hosting an API) that each connect to a read-replica set of 3 members, accessible behind a DNS name that round-robins IPs for the 3 replicas. Each app server rus a connection pool of 25 connections.

You start your app servers with an ambient traffic load of 50 http requests per second, and the connection pools likely fill up in a minute or two. Everything is great at this point.

But when you hit weekly traffic peaks, you might reach up to 1,000 http requests per second. If you have a DB with elastic read replicas, you might quickly add 10 more read replicas during this peak time and scale them back down during slower times of the week in order to reduce cost and avoid the additional replication lag you might see with larger numbers or read replicas.

When you add these 10 read replicas, assuming the first 3 remain healthy, the connection pool with not inherently adopt these new replicas because the pools are full and the connections are healthy, so connections are continuously reused with no need to create new ones. Some level of intervention is needed to fill the connection pool with connections that are balanced between all the replicas.

If you set the `maxUses` configuration option, the pool will proactively retire a resource (connection) once it has been acquired and released `maxUses` number of times, which over a period of time will eventually lead to a relatively balanced pool.

One way to calculate a reasonable value for `maxUses` is to identify an acceptable window for rebalancing and then solve for `maxUses`:

```
maxUses = rebalanceWindowSeconds * totalRequestsPerSecond / numAppInstances / poolSize
```

In the example above, assuming we acquire and release 1 connection per request and we are aiming for a 30 minute rebalancing window:

```
maxUses = rebalanceWindowSeconds * totalRequestsPerSecond / numAppInstances / poolSize
   7200 =        1800            *          1000          /        10       /    25
```

...in other words we would retire and replace a connection after every 7200 uses, which we expect to be around 30 minutes under peak load.

Of course, you'll want to test scenarios for your own application since every app and every traffic pattern is different.

## Run Tests

    $ npm install
    $ npm test
