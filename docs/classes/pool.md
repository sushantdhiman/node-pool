[sequelize-pool](../README.md) / Pool

# Class: Pool<RawResource\>

## Type parameters

Name |
------ |
`RawResource` |

## Hierarchy

* **Pool**

## Table of contents

### Constructors

- [constructor](pool.md#constructor)

### Accessors

- [available](pool.md#available)
- [maxSize](pool.md#maxsize)
- [minSize](pool.md#minsize)
- [name](pool.md#name)
- [size](pool.md#size)
- [using](pool.md#using)
- [waiting](pool.md#waiting)

### Methods

- [acquire](pool.md#acquire)
- [destroy](pool.md#destroy)
- [destroyAllNow](pool.md#destroyallnow)
- [drain](pool.md#drain)
- [release](pool.md#release)

## Constructors

### constructor

\+ **new Pool**<RawResource\>(`factory`: *FactoryOptions*<RawResource\>): [*Pool*](pool.md)<RawResource\>

Generate an object pool with a specified `factory`.

#### Type parameters:

Name |
------ |
`RawResource` |

#### Parameters:

Name | Type |
------ | ------ |
`factory` | *FactoryOptions*<RawResource\> |

**Returns:** [*Pool*](pool.md)<RawResource\>

## Accessors

### available

• **available**(): *number*

Number of unused resources in the pool

**Returns:** *number*

___

### maxSize

• **maxSize**(): *number*

Maximum number of resources allowed by pool

**Returns:** *number*

___

### minSize

• **minSize**(): *number*

Minimum number of resources allowed by pool

**Returns:** *number*

___

### name

• **name**(): *string*

factory.name for this pool

**Returns:** *string*

___

### size

• **size**(): *number*

Number of resources in the pool regardless of
whether they are free or in use

**Returns:** *number*

___

### using

• **using**(): *number*

Number of in use resources

**Returns:** *number*

___

### waiting

• **waiting**(): *number*

Number of callers waiting to acquire a resource

**Returns:** *number*

## Methods

### acquire

▸ **acquire**(): *Promise*<RawResource\>

Requests a new resource. This will call factory.create to request new resource.

It will be rejected with timeout error if `factory.create` didn't respond
back within specified `acquireTimeoutMillis`

**Throws:** [TimeoutError](timeouterror.md)

**Returns:** *Promise*<RawResource\>

___

### destroy

▸ **destroy**(`resource`: RawResource): *Promise*<*void*\>

Removes a resource from pool. The factory's destroy handler will be called with given resource.

This is an alternative to `release()`

#### Parameters:

Name | Type |
------ | ------ |
`resource` | RawResource |

**Returns:** *Promise*<*void*\>

___

### destroyAllNow

▸ **destroyAllNow**(): *Promise*<*void*\>

Forcibly destroys all clients regardless of timeout. Intended to be
invoked as part of a drain. Does not prevent the creation of new
clients as a result of subsequent calls to acquire.

Note that if `factory.min > 0`, the pool will destroy all idle resources
in the pool, but replace them with newly created resources up to the
specified `factory.min` value.  If this is not desired, set `factory.min`
to zero before calling `destroyAllNow()`

**Throws:** {@link AggregateError}

**Returns:** *Promise*<*void*\>

___

### drain

▸ **drain**(): *Promise*<*void*\>

Disallow any new acquire requests and let the request backlog dissipate.

**Returns:** *Promise*<*void*\>

___

### release

▸ **release**(`resource`: RawResource): *void*

Return the resource to the pool, add it to the available objects.
Resource will be available for use by pending or future `acquire()` calls

#### Parameters:

Name | Type |
------ | ------ |
`resource` | RawResource |

**Returns:** *void*
