// @flow strict

const { TimeoutError } = require("./TimeoutError");

class Deferred {
  /*::
  _timeout: TimeoutID;
  _promise: Promise<mixed>;
  _resolve: (mixed) => void;
  _reject: (error: Error) => void;
  */
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._reject = reject;
      this._resolve = resolve;
    });
  }

  registerTimeout(timeoutInMillis: number, callback: () => void) {
    if (this._timeout) return;

    this._timeout = setTimeout(() => {
      callback();
      this.reject(new TimeoutError("Operation timeout"));
    }, timeoutInMillis);
  }

  _clearTimeout() {
    if (!this._timeout) return;

    clearTimeout(this._timeout);
  }

  resolve(value: mixed) {
    this._clearTimeout();
    this._resolve(value);
  }

  reject(error: Error) {
    this._clearTimeout();
    this._reject(error);
  }

  promise() {
    return this._promise;
  }
}

module.exports = Deferred;
