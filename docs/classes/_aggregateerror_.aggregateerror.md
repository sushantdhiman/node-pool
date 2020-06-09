[sequelize-pool](../README.md) › ["AggregateError"](../modules/_aggregateerror_.md) › [AggregateError](_aggregateerror_.aggregateerror.md)

# Class: AggregateError

A wrapper for multiple Errors

## Hierarchy

* [Error](_aggregateerror_.aggregateerror.md#static-error)

  ↳ **AggregateError**

## Index

### Constructors

* [constructor](_aggregateerror_.aggregateerror.md#constructor)

### Properties

* [errors](_aggregateerror_.aggregateerror.md#errors)
* [message](_aggregateerror_.aggregateerror.md#message)
* [name](_aggregateerror_.aggregateerror.md#name)
* [stack](_aggregateerror_.aggregateerror.md#optional-stack)
* [Error](_aggregateerror_.aggregateerror.md#static-error)

### Methods

* [toString](_aggregateerror_.aggregateerror.md#tostring)

## Constructors

###  constructor

\+ **new AggregateError**(`errors`: [Error](_aggregateerror_.aggregateerror.md#static-error)[]): *[AggregateError](_aggregateerror_.aggregateerror.md)*

**Parameters:**

Name | Type |
------ | ------ |
`errors` | [Error](_aggregateerror_.aggregateerror.md#static-error)[] |

**Returns:** *[AggregateError](_aggregateerror_.aggregateerror.md)*

## Properties

###  errors

• **errors**: *[Error](_aggregateerror_.aggregateerror.md#static-error)[]*

___

###  message

• **message**: *string*

*Inherited from [AggregateError](_aggregateerror_.aggregateerror.md).[message](_aggregateerror_.aggregateerror.md#message)*

___

###  name

• **name**: *string*

*Inherited from [AggregateError](_aggregateerror_.aggregateerror.md).[name](_aggregateerror_.aggregateerror.md#name)*

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [AggregateError](_aggregateerror_.aggregateerror.md).[stack](_aggregateerror_.aggregateerror.md#optional-stack)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

## Methods

###  toString

▸ **toString**(): *string*

**Returns:** *string*
