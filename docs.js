var url = require('./dist/documents/url')
var DocEdit = require('./dist/documents/DocEdit')

module.exports = {
  selectedState: url.selectedState,
  SELECT_NEW_ID: url.SELECT_NEW_ID,
  withDocEditContext: DocEdit.withDocEditContext,
}
