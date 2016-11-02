import React from 'react'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

const DraftHtmlView = ({
  data,
  styles,
}) => {
  const content = convertFromRaw(JSON.parse(data))
  return (
    content.hasText()
      ? <div style={styles} dangerouslySetInnerHTML={{ __html: stateToHTML(content) }} />
      : null
  )
}

export default DraftHtmlView
