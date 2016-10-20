import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { withTheme } from '@mindhive/components/theme'
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

export const DocumentsList = ({
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
        {selected.isNew &&
          React.createElement(DocEdit, { ...editProps, key: 'new' })
        }
        <ReactCSSTransitionGroup
          transitionName="doc-list-item"
          transitionAppear
          transitionAppearTimeout={250}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={150}
        >
          {documents && documents.length &&
            documents.map((document, index) =>
              DocEdit && selected.id === document._id ?
                React.createElement(DocEdit, { ...editProps, key: `${document._id}.edit`, document })
                : React.createElement(DocView, { ...viewProps, index, id: document._id, key: `${document._id}.view`, document })
            )
          }
        </ReactCSSTransitionGroup>
      </List>
    </div>
  :
    <div style={styles.noDocuments}>No {vocab.documents} defined</div>


export default withTheme(DocumentsList, mapThemeToStyles)
