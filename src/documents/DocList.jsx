import React from 'react'

import spacing from 'material-ui/styles/spacing'
import typography from 'material-ui/styles/typography'

import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import withTheme from '../theme/withTheme'


const mapThemeToStyles = (theme) => {
  const headingRoot = {
    color: theme.palette.disabledColor,
    fontWeight: typography.fontWeightMedium,
    padding: spacing.desktopGutterLess,
    fontSize: spacing.desktopGutter,
  }

  return {
    noDocuments: {
      ...headingRoot,
      textAlign: 'center',
      padding: theme.appBar.height,
      fontSize: spacing.desktopGutterMore,
    },
  }
}

const mongoIdSelector = doc => doc._id

const DocList = ({
  vocab,
  title,
  documents = [],
  selected,
  styles,
  docProps,
  DocEdit,
  editProps,
  DocView,
  viewProps,
  docIdSelector = mongoIdSelector,
}) => {
  const docComponents = documents.map((doc, index) => {
    const id = docIdSelector(doc)
    return selected.id === id
      ?
        <DocEdit
          {...docProps}
          {...editProps}
          selected={selected}
          key={`${id}.edit`}
          id={id}
          document={doc}
        />
      :
        <DocView
          {...docProps}
          {...viewProps}
          index={index}
          id={id}
          key={`${id}.view`}
          document={doc}
        />
  })
  if (selected.isNew) {
    docComponents.splice(selected.atIndex, 0,
      <DocEdit
        {...docProps}
        {...editProps}
        selected={selected}
        key={`new-${selected.atIndex}`}
      />
    )
  }
  return selected.isNew || documents.length ?
    <div id={`${vocab.id}-list-selector`}>
      <List>
        {title ? <Subheader>{title}</Subheader> : null}
        {docComponents}
      </List>
    </div>
    :
      <div style={styles.noDocuments}>No {vocab.documents} defined</div>
}

export default
  withTheme(
    DocList,
    mapThemeToStyles,
  )
