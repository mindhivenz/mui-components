'use strict';

var Version = require('../dist/Version/Version');
var versionDomain = require('../dist/Version/versionDomain');

module.exports = {
  Version: Version.default,
  versionDomain: versionDomain.default
};