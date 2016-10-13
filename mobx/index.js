'use strict';

var connect = require('../dist/mobx/connect')
var createStore = require('../dist/mobx/createStore')
var Provider = require('../dist/mobx/Provider')

module.exports = {
  connect: connect.default,
  createStore: createStore.default,
  Provider: Provider.default,
}