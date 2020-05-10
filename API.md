## Classes

<dl>
<dt><a href="#Pool">Pool</a></dt>
<dd><p>Generate an object pool with a specified <code>factory</code>.</p>
</dd>
<dt><a href="#TimeoutError">TimeoutError</a></dt>
<dd><p>Error which is thrown by pool when acquire request timeouts</p>
</dd>
</dl>

<a name="Pool"></a>

## Pool
Generate an object pool with a specified `factory`.

**Kind**: global class  

* [Pool](#Pool)
    * [new Pool(factory)](#new_Pool_new)
    * [.size](#Pool+size)
    * [.name](#Pool+name)
    * [.available](#Pool+available)
    * [.using](#Pool+using)
    * [.waiting](#Pool+waiting)
    * [.maxSize](#Pool+maxSize)
    * [.minSize](#Pool+minSize)
    * [.acquire()](#Pool+acquire) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.release(resource)](#Pool+release) ⇒ <code>void</code>
    * [.destroy(resource)](#Pool+destroy) ⇒ <code>void</code>
    * [.drain()](#Pool+drain) ⇒ <code>Promise</code>
    * [.destroyAllNow()](#Pool+destroyAllNow) ⇒ <code>Promise</code>

<a name="new_Pool_new"></a>

### new Pool(factory)
Generate an object pool with a specified `factory`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| factory | <code>Object</code> |  | Factory to be used for generating and destroying the items. |
| [factory.name] | <code>String</code> |  | Name of the factory. Serves only logging purposes. |
| factory.create | <code>function</code> |  | Should create the item to be acquired. |
| factory.destroy | <code>function</code> |  | Should gently close any resources that the item is using.   Called before the items is destroyed. |
| factory.validate | <code>function</code> |  | Should return true if connection is still valid and false   If it should be removed from pool. Called before item is   acquired from pool. |
| factory.max | <code>Number</code> |  | Maximum number of items that can exist at the same time.   Any further acquire requests will be pushed to the waiting list. |
| factory.min | <code>Number</code> |  | Minimum number of items in pool (including in-use).   When the pool is created, or a resource destroyed, this minimum will   be checked. If the pool resource count is below the minimum, a new   resource will be created and added to the pool. |
| [factory.maxUses] | <code>Number</code> | <code>Infinity</code> | The number of times an item is to be used before it is destroyed   no matter whether it is still healthy.  A value of 0 indicates the   item should be used indefinitely so long as it is healthy.   This can help with "re-balancing" connections when pool members behind   a load balancer are added but are not being adopted due to pools being   full of pre-existing persistent connections. |
| [factory.idleTimeoutMillis] | <code>Number</code> | <code>30000</code> | Delay in milliseconds after which available resources in the pool will be destroyed.   This does not affects pending acquire requests. |
| [factory.acquireTimeoutMillis] | <code>Number</code> | <code>30000</code> | Delay in milliseconds after which pending acquire request in the pool will be rejected.   Pending acquires are acquire calls which are yet to receive an response from factory.create |
| [factory.reapIntervalMillis] | <code>Number</code> | <code>1000</code> | Clean up is scheduled in every `factory.reapIntervalMillis` milliseconds. |
| [factory.log] | <code>Boolean</code> \| <code>function</code> | <code>false</code> | Whether the pool should log activity. If function is specified,   that will be used instead. The function expects the arguments msg, loglevel |

<a name="Pool+size"></a>

### pool.size
Number of resources in the pool regardless of
whether they are free or in use

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+name"></a>

### pool.name
factory.name for this pool

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+available"></a>

### pool.available
Number of unused resources in the pool

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+using"></a>

### pool.using
Number of in use resources

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+waiting"></a>

### pool.waiting
Number of callers waiting to acquire a resource

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+maxSize"></a>

### pool.maxSize
Number of maximum number of resources allowed by pool

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+minSize"></a>

### pool.minSize
Number of minimum number of resources allowed by pool

**Kind**: instance property of [<code>Pool</code>](#Pool)  
<a name="Pool+acquire"></a>

### pool.acquire() ⇒ <code>Promise.&lt;Object&gt;</code>
Requests a new resource. This will call factory.create to request new resource.

It will be rejected with timeout error if `factory.create` didn't respond
back within specified `acquireTimeoutMillis`

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+release"></a>

### pool.release(resource) ⇒ <code>void</code>
Return the resource to the pool, in case it is no longer required.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>Object</code> | The acquired object to be put back to the pool. |

<a name="Pool+destroy"></a>

### pool.destroy(resource) ⇒ <code>void</code>
Request the client to be destroyed. The factory's destroy handler
will also be called.

This should be called within an acquire() block as an alternative to release().

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>Object</code> | The acquired item to be destroyed. |

<a name="Pool+drain"></a>

### pool.drain() ⇒ <code>Promise</code>
Disallow any new requests and let the request backlog dissipate.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+destroyAllNow"></a>

### pool.destroyAllNow() ⇒ <code>Promise</code>
Forcibly destroys all clients regardless of timeout.  Intended to be
invoked as part of a drain.  Does not prevent the creation of new
clients as a result of subsequent calls to acquire.

Note that if factory.min > 0, the pool will destroy all idle resources
in the pool, but replace them with newly created resources up to the
specified factory.min value.  If this is not desired, set factory.min
to zero before calling destroyAllNow()

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="TimeoutError"></a>

## TimeoutError
Error which is thrown by pool when acquire request timeouts

**Kind**: global class  
