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
  documents,
  selected,
  DocEdit,
  editProps,
  DocView,
  viewProps,

) => {
  const items = []
  let addedNew = false
  documents.forEach((document, index) => {
    if (selected.isNew && (selected.atIndex === index)) {
      addedNew = true
      items.push(
        <DocEdit
          {...editProps}
          key={`new-${index}`}
        />
      )
    }
    if (selected.id === document._id) {
      items.push(
        <DocEdit
          {...editProps}
          key={`${document._id}.edit`}
          document={document}
        />
      )
    } else {
      items.push(
        <DocView
          {...viewProps}
          index={index}
          id={document._id}
          key={`${document._id}.view`}
          document={document}
        />
      )
    }}
  )
  if (selected.isNew && ! addedNew ) {
    items.push(
      <DocEdit
        {...editProps}
        key={`new-${selected.atIndex}`}
      />
    )

  }
  return items
}

const DocumentsList = ({
  vocab,
  title,
  documents,
  selected,
  styles,
  DocEdit,
  editProps,
  DocView,
  viewProps,
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
          {documents && getList(
            documents,
            selected,
            DocEdit,
            editProps,
            DocView,
            viewProps,
          ).map((item) =>
            item
          )}
        </ReactCSSTransitionGroup>
      </List>
    </div>
    :
    <div style={styles.noDocuments}>No {vocab.documents} defined</div>


export default
withTheme(
  DocumentsList,
  mapThemeToStyles,
)
