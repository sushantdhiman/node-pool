"use strict";

const Promise = require("bluebird");

/**
 * Generic class for handling creation of resources
 * for testing
 */
class ResourceFactory {
  constructor() {
    this.created = 0;
    this.destroyed = 0;
    this.bin = [];
  }

  create() {
    return Promise.delay(1).then(() => ({
      id: this.created++
    }));
  }

  destroy(resource) {
    this.destroyed++;
    this.bin.push(resource);
  }

  validate() {
    return true;
  }
}

exports.ResourceFactory = ResourceFactory;
