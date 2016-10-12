'use strict';

var Version = require('./Version')
var versionDomain = require('./versionDomain')

module.exports = {
  Version: Version.default,
  versionDomain: versionDomain.default,
}