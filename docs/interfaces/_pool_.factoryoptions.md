[sequelize-pool](../README.md) › ["Pool"](../modules/_pool_.md) › [FactoryOptions](_pool_.factoryoptions.md)

# Interface: FactoryOptions <**T**>

Factory to be used for generating and destroying the items.

## Type parameters

▪ **T**

## Hierarchy

* **FactoryOptions**

## Index

### Properties

* [acquireTimeoutMillis](_pool_.factoryoptions.md#optional-acquiretimeoutmillis)
* [create](_pool_.factoryoptions.md#create)
* [destroy](_pool_.factoryoptions.md#destroy)
* [idleTimeoutMillis](_pool_.factoryoptions.md#optional-idletimeoutmillis)
* [log](_pool_.factoryoptions.md#optional-log)
* [max](_pool_.factoryoptions.md#max)
* [maxUses](_pool_.factoryoptions.md#optional-maxuses)
* [min](_pool_.factoryoptions.md#min)
* [name](_pool_.factoryoptions.md#optional-name)
* [reapIntervalMillis](_pool_.factoryoptions.md#optional-reapintervalmillis)
* [validate](_pool_.factoryoptions.md#validate)

## Properties

### `Optional` acquireTimeoutMillis

• **acquireTimeoutMillis**? : *number*

Defined in src/Pool.ts:84

Delay in milliseconds after which pending acquire request in the pool will be rejected.
Pending acquires are acquire calls which are yet to receive an response from factory.create

**`default`** 30000

___

###  create

• **create**: *function*

Defined in src/Pool.ts:29

Should create the item to be acquired

#### Type declaration:

▸ (): *Promise‹T›*

___

###  destroy

• **destroy**: *function*

Defined in src/Pool.ts:35

Should gently close any resources that the item is using.
Called before the items is destroyed.

#### Type declaration:

▸ (`resource`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`resource` | T |

___

### `Optional` idleTimeoutMillis

• **idleTimeoutMillis**? : *number*

Defined in src/Pool.ts:76

Delay in milliseconds after which available resources in the pool will be destroyed.
This does not affects pending acquire requests.

**`default`** 30000

___

### `Optional` log

• **log**? : *FactoryLogger | boolean*

Defined in src/Pool.ts:99

Whether the pool should log activity. If function is specified,
that will be used instead. The function expects the arguments msg, loglevel

**`default`** false

___

###  max

• **max**: *number*

Defined in src/Pool.ts:48

Maximum number of items that can exist at the same time.
Any further acquire requests will be pushed to the waiting list.

___

### `Optional` maxUses

• **maxUses**? : *number*

Defined in src/Pool.ts:68

The number of times an item is to be used before it is destroyed
no matter whether it is still healthy.  A value of 0 indicates the
item should be used indefinitely so long as it is healthy.
This can help with "re-balancing" connections when pool members behind
a load balancer are added but are not being adopted due to pools being
full of pre-existing persistent connections.

**`default`** Infinity

___

###  min

• **min**: *number*

Defined in src/Pool.ts:56

Minimum number of items in pool (including in-use).
When the pool is created, or a resource destroyed, this minimum will
be checked. If the pool resource count is below the minimum, a new
resource will be created and added to the pool.<Paste>

___

### `Optional` name

• **name**? : *string*

Defined in src/Pool.ts:24

Name of the factory. Serves only logging purposes.

___

### `Optional` reapIntervalMillis

• **reapIntervalMillis**? : *number*

Defined in src/Pool.ts:91

Clean up is scheduled in every `factory.reapIntervalMillis` milliseconds.

**`default`** 1000

___

###  validate

• **validate**: *function*

Defined in src/Pool.ts:42

Should return true if connection is still valid and false
If it should be removed from pool. Called before item is
acquired from pool.

#### Type declaration:

▸ (`resource`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`resource` | T |
