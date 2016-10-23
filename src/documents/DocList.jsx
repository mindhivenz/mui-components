import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import withTheme from '../theme/withTheme'
import spacing from 'material-ui/styles/spacing'
import typography from 'material-ui/styles/typography'

import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'


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

const getList = (
  documents = [],
  selected,
  DocEdit,
  editProps,
  DocView,
  viewProps,
  docIdSelector,
) => {
  const items = documents.map((doc, index) => {
    const id = docIdSelector(doc)
    return selected.id === id ?
      <DocEdit
        {...editProps}
        id={id}
        key={`${id}.edit`}
        document={doc}
      />
      :
      <DocView
        {...viewProps}
        index={index}
        id={id}
        key={`${id}.view`}
        document={doc}
      />
  })
  if (selected.isNew) {
    items.splice(selected.atIndex, 0,
      <DocEdit
        {...editProps}
        key={`new-${selected.atIndex}`}
      />
    )
  }
  return items
}

const mongoIdSelector = (doc) => doc._id

const DocList = ({
  vocab,
  title,
  documents,
  selected,
  styles,
  DocEdit,
  editProps,
  DocView,
  viewProps,
  docIdSelector = mongoIdSelector,
}) =>
  selected.isNew || (documents && documents.length) ?
    <div id={`${vocab.id}-list-selector`}>
      <List>
        {title ? <Subheader>{title}</Subheader> : null}
        <ReactCSSTransitionGroup
          transitionName="doc-list-item"
          transitionAppear
          transitionAppearTimeout={250}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={150}
        >
          {getList(
            documents,
            selected,
            DocEdit,
            editProps,
            DocView,
            viewProps,
            docIdSelector,
          )}
        </ReactCSSTransitionGroup>
      </List>
    </div>
    :
    <div style={styles.noDocuments}>No {vocab.documents} defined</div>


export default
withTheme(
  DocList,
  mapThemeToStyles,
)
