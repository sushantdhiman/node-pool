// @flow strict

/**
 * Error which is thrown by pool when acquire request timeouts
 */
class TimeoutError extends Error {}

exports.TimeoutError = TimeoutError;
