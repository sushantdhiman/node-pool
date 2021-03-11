[sequelize-pool](../README.md) / AggregateError

# Class: AggregateError

A wrapper for multiple Errors

## Hierarchy

* *Error*

  ↳ **AggregateError**

## Table of contents

### Constructors

- [constructor](aggregateerror.md#constructor)

### Properties

- [errors](aggregateerror.md#errors)
- [message](aggregateerror.md#message)
- [name](aggregateerror.md#name)
- [prepareStackTrace](aggregateerror.md#preparestacktrace)
- [stack](aggregateerror.md#stack)
- [stackTraceLimit](aggregateerror.md#stacktracelimit)

### Methods

- [captureStackTrace](aggregateerror.md#capturestacktrace)
- [toString](aggregateerror.md#tostring)

## Constructors

### constructor

\+ **new AggregateError**(`errors`: Error[]): [*AggregateError*](aggregateerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`errors` | Error[] |

**Returns:** [*AggregateError*](aggregateerror.md)

## Properties

### errors

• **errors**: Error[]

___

### message

• **message**: *string*

___

### name

• **name**: *string*

___

### prepareStackTrace

• `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |
`stackTraces` | CallSite[] |

**Returns:** *any*

___

### stack

• `Optional` **stack**: *string*

___

### stackTraceLimit

• **stackTraceLimit**: *number*

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`: Object, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | Object |
`constructorOpt?` | Function |

**Returns:** *void*

___

### toString

▸ **toString**(): *string*

**Returns:** *string*
