[sequelize-pool](../README.md) › ["Pool"](../modules/_pool_.md) › [Pool](_pool_.pool.md)

# Class: Pool <**RawResource**>

## Type parameters

▪ **RawResource**

## Hierarchy

* **Pool**

## Index

### Constructors

* [constructor](_pool_.pool.md#constructor)

### Accessors

* [available](_pool_.pool.md#available)
* [maxSize](_pool_.pool.md#maxsize)
* [minSize](_pool_.pool.md#minsize)
* [name](_pool_.pool.md#name)
* [size](_pool_.pool.md#size)
* [using](_pool_.pool.md#using)
* [waiting](_pool_.pool.md#waiting)

### Methods

* [acquire](_pool_.pool.md#acquire)
* [destroy](_pool_.pool.md#destroy)
* [destroyAllNow](_pool_.pool.md#destroyallnow)
* [drain](_pool_.pool.md#drain)
* [release](_pool_.pool.md#release)

## Constructors

###  constructor

\+ **new Pool**(`factory`: [FactoryOptions](../interfaces/_pool_.factoryoptions.md)‹RawResource›): *[Pool](_pool_.pool.md)*

Generate an object pool with a specified `factory`.

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [FactoryOptions](../interfaces/_pool_.factoryoptions.md)‹RawResource› |

**Returns:** *[Pool](_pool_.pool.md)*

## Accessors

###  available

• **get available**(): *number*

Number of unused resources in the pool

**Returns:** *number*

___

###  maxSize

• **get maxSize**(): *number*

Maximum number of resources allowed by pool

**Returns:** *number*

___

###  minSize

• **get minSize**(): *number*

Minimum number of resources allowed by pool

**Returns:** *number*

___

###  name

• **get name**(): *string*

factory.name for this pool

**Returns:** *string*

___

###  size

• **get size**(): *number*

Number of resources in the pool regardless of
whether they are free or in use

**Returns:** *number*

___

###  using

• **get using**(): *number*

Number of in use resources

**Returns:** *number*

___

###  waiting

• **get waiting**(): *number*

Number of callers waiting to acquire a resource

**Returns:** *number*

## Methods

###  acquire

▸ **acquire**(): *Promise‹RawResource›*

Requests a new resource. This will call factory.create to request new resource.

It will be rejected with timeout error if `factory.create` didn't respond
back within specified `acquireTimeoutMillis`

**Throws:** [TimeoutError](_timeouterror_.timeouterror.md)

**Returns:** *Promise‹RawResource›*

___

###  destroy

▸ **destroy**(`resource`: RawResource): *Promise‹void›*

Removes a resource from pool. The factory's destroy handler will be called with given resource.

This is an alternative to `release()`

**Parameters:**

Name | Type |
------ | ------ |
`resource` | RawResource |

**Returns:** *Promise‹void›*

___

###  destroyAllNow

▸ **destroyAllNow**(): *Promise‹void›*

Forcibly destroys all clients regardless of timeout. Intended to be
invoked as part of a drain. Does not prevent the creation of new
clients as a result of subsequent calls to acquire.

Note that if `factory.min > 0`, the pool will destroy all idle resources
in the pool, but replace them with newly created resources up to the
specified `factory.min` value.  If this is not desired, set `factory.min`
to zero before calling `destroyAllNow()`

**Throws:** [AggregateError](_aggregateerror_.aggregateerror.md)

**Returns:** *Promise‹void›*

___

###  drain

▸ **drain**(): *Promise‹void›*

Disallow any new acquire requests and let the request backlog dissipate.

**Returns:** *Promise‹void›*

___

###  release

▸ **release**(`resource`: RawResource): *void*

Return the resource to the pool, add it to the available objects.
Resource will be available for use by pending or future `acquire()` calls

**Parameters:**

Name | Type |
------ | ------ |
`resource` | RawResource |

**Returns:** *void*
