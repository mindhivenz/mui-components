var Theme= require('../dist/Theme/Theme');
var withTheme = require('../dist/Theme/withTheme');

module.exports = {
  Theme: Theme.default,
};
module.exports.default = withTheme;