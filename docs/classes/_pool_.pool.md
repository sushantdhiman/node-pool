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

Defined in src/Pool.ts:120

Generate an object pool with a specified `factory`.

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [FactoryOptions](../interfaces/_pool_.factoryoptions.md)‹RawResource› |

**Returns:** *[Pool](_pool_.pool.md)*

## Accessors

###  available

• **get available**(): *number*

Defined in src/Pool.ts:203

Number of unused resources in the pool

**Returns:** *number*

___

###  maxSize

• **get maxSize**(): *number*

Defined in src/Pool.ts:224

Maximum number of resources allowed by pool

**Returns:** *number*

___

###  minSize

• **get minSize**(): *number*

Defined in src/Pool.ts:231

Minimum number of resources allowed by pool

**Returns:** *number*

___

###  name

• **get name**(): *string*

Defined in src/Pool.ts:196

factory.name for this pool

**Returns:** *string*

___

###  size

• **get size**(): *number*

Defined in src/Pool.ts:189

Number of resources in the pool regardless of
whether they are free or in use

**Returns:** *number*

___

###  using

• **get using**(): *number*

Defined in src/Pool.ts:210

Number of in use resources

**Returns:** *number*

___

###  waiting

• **get waiting**(): *number*

Defined in src/Pool.ts:217

Number of callers waiting to acquire a resource

**Returns:** *number*

## Methods

###  acquire

▸ **acquire**(): *Promise‹RawResource›*

Defined in src/Pool.ts:426

Requests a new resource. This will call factory.create to request new resource.

It will be rejected with timeout error if `factory.create` didn't respond
back within specified `acquireTimeoutMillis`

**Returns:** *Promise‹RawResource›*

___

###  destroy

▸ **destroy**(`resource`: RawResource): *void*

Defined in src/Pool.ts:511

Request the client to be destroyed. The factory's destroy handler
will also be called.

This should be called within an acquire() block as an alternative to release().

**Parameters:**

Name | Type |
------ | ------ |
`resource` | RawResource |

**Returns:** *void*

___

###  destroyAllNow

▸ **destroyAllNow**(): *Promise‹void›*

Defined in src/Pool.ts:586

Forcibly destroys all clients regardless of timeout.  Intended to be
invoked as part of a drain.  Does not prevent the creation of new
clients as a result of subsequent calls to acquire.

Note that if factory.min > 0, the pool will destroy all idle resources
in the pool, but replace them with newly created resources up to the
specified factory.min value.  If this is not desired, set factory.min
to zero before calling destroyAllNow()

**Returns:** *Promise‹void›*

___

###  drain

▸ **drain**(): *Promise‹void›*

Defined in src/Pool.ts:541

Disallow any new requests and let the request backlog dissipate.

**Returns:** *Promise‹void›*

___

###  release

▸ **release**(`resource`: RawResource): *void*

Defined in src/Pool.ts:451

Return the resource to the pool, in case it is no longer required.

**Parameters:**

Name | Type |
------ | ------ |
`resource` | RawResource |

**Returns:** *void*
