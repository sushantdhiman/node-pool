"use strict";

const tap = require("tap");
const Pool = require("../..").Pool;

tap.test("fail for max < min", (t) => {
  const factory = {
    name: "test-config",
    create: () => {},
    destroy: () => {},
    validate: () => {},
    max: 1,
    min: 12,
  };

  t.throws(() => {
    new Pool(factory);
  }, "max is smaller than min");
  t.end();
});

tap.test("fail without factory.create", (t) => {
  const factory = {
    name: "test-config",
    destroy: () => {},
    validate: () => {},
    max: 1,
    min: 0,
  };

  t.throws(() => {
    new Pool(factory);
  }, "create function is required");
  t.end();
});

tap.test("fail without factory.destroy", (t) => {
  const factory = {
    name: "test-config",
    create: () => {},
    validate: () => {},
    max: 1,
    min: 0,
  };

  t.throws(() => {
    new Pool(factory);
  }, "destroy function is required");
  t.end();
});

tap.test("fail without factory.validate", (t) => {
  const factory = {
    name: "test-config",
    create: () => {},
    destroy: () => {},
    max: 1,
    min: 0,
  };

  t.throws(() => {
    new Pool(factory);
  }, "validate function is required");
  t.end();
});
