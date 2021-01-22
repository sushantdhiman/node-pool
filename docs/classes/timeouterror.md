[sequelize-pool](../README.md) / TimeoutError

# Class: TimeoutError

Error which is thrown by pool when acquire request timeouts

## Hierarchy

* *Error*

  ↳ **TimeoutError**

## Table of contents

### Constructors

- [constructor](timeouterror.md#constructor)

### Properties

- [message](timeouterror.md#message)
- [name](timeouterror.md#name)
- [prepareStackTrace](timeouterror.md#preparestacktrace)
- [stack](timeouterror.md#stack)
- [stackTraceLimit](timeouterror.md#stacktracelimit)

### Methods

- [captureStackTrace](timeouterror.md#capturestacktrace)

## Constructors

### constructor

\+ **new TimeoutError**(`message?`: *string*): [*TimeoutError*](timeouterror.md)

#### Parameters:

Name | Type |
------ | ------ |
`message?` | *string* |

**Returns:** [*TimeoutError*](timeouterror.md)

## Properties

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

___

### stack

• `Optional` **stack**: *string*

___

### stackTraceLimit

• **stackTraceLimit**: *number*

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
------ | ------ |
`targetObject` | *object* |
`constructorOpt?` | Function |

**Returns:** *void*
