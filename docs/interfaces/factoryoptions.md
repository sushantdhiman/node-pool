[sequelize-pool](../README.md) / FactoryOptions

# Interface: FactoryOptions<T\>

Factory options. Used for generating/destroying/validating resources & other configuration

## Type parameters

Name |
:------ |
`T` |

## Table of contents

### Properties

- [acquireTimeoutMillis](factoryoptions.md#acquiretimeoutmillis)
- [create](factoryoptions.md#create)
- [destroy](factoryoptions.md#destroy)
- [idleTimeoutMillis](factoryoptions.md#idletimeoutmillis)
- [log](factoryoptions.md#log)
- [max](factoryoptions.md#max)
- [maxUses](factoryoptions.md#maxuses)
- [min](factoryoptions.md#min)
- [name](factoryoptions.md#name)
- [reapIntervalMillis](factoryoptions.md#reapintervalmillis)
- [validate](factoryoptions.md#validate)

## Properties

### acquireTimeoutMillis

• `Optional` **acquireTimeoutMillis**: *number*

Delay in milliseconds after which pending acquire request in the pool will be rejected.
Pending acquires are acquire calls which are yet to receive an response from factory.create

**`default`** 30000

___

### create

• **create**: () => *Promise*<T\>

Should create the item to be acquired

#### Type declaration:

▸ (): *Promise*<T\>

**Returns:** *Promise*<T\>

___

### destroy

• **destroy**: (`resource`: T) => *void* \| *Promise*<void\>

Should gently close any resources that the item is using.
Called when resource is destroyed.

#### Type declaration:

▸ (`resource`: T): *void* \| *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`resource` | T |

**Returns:** *void* \| *Promise*<void\>

___

### idleTimeoutMillis

• `Optional` **idleTimeoutMillis**: *number*

Delay in milliseconds after which available resources in the pool will be destroyed.
This does not affects pending acquire requests.

**`default`** 30000

___

### log

• `Optional` **log**: *boolean* \| FactoryLogger

Whether the pool should log activity. If function is specified,
that will be used instead. The function expects the arguments msg, loglevel

**`default`** false

___

### max

• **max**: *number*

Maximum number of items that can exist at the same time.
Any further acquire requests will be pushed to the waiting list.

___

### maxUses

• `Optional` **maxUses**: *number*

The number of times an item is to be used before it is destroyed
no matter whether it is still healthy.  A value of 0 indicates the
item should be used indefinitely so long as it is healthy.
This can help with "re-balancing" connections when pool members behind
a load balancer are added but are not being adopted due to pools being
full of pre-existing persistent connections.

**`default`** Infinity

___

### min

• **min**: *number*

Minimum number of items in pool (including in-use).
When the pool is created, or a resource destroyed, this minimum will
be checked. If the pool resource count is below the minimum, a new
resource will be created and added to the pool.<Paste>

___

### name

• `Optional` **name**: *string*

Name of the factory. Serves only logging purposes.

___

### reapIntervalMillis

• `Optional` **reapIntervalMillis**: *number*

Clean up is scheduled in every `factory.reapIntervalMillis` milliseconds.

**`default`** 1000

___

### validate

• **validate**: (`resource`: T) => *boolean*

Should return true if connection is still valid and false
If it should be removed from pool. Called before item is
acquired from pool.

#### Type declaration:

▸ (`resource`: T): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`resource` | T |

**Returns:** *boolean*
