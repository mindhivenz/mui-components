import React from 'react'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import UnderlineIcon from 'material-ui/svg-icons/editor/format-underlined'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import withStyleSheet from '../../theme/withStyleSheet'
import StyleButton from './StyleButton'

const EditorCommands = ({
  styles,
  prepareStyles,
  toggleStyle,
  editorState,
  focused,
}) =>
  <div style={prepareStyles(styles.buttons)}>
    <StyleButton
      editorState={editorState}
      toggleStyle={toggleStyle}
      focused={focused}
      inlineStyle={'BOLD'}
    >
      <BoldIcon />
    </StyleButton>
    <StyleButton
      editorState={editorState}
      toggleStyle={toggleStyle}
      focused={focused}
      inlineStyle={'ITALIC'}
    >
      <ItalicIcon />
    </StyleButton>
    <StyleButton
      editorState={editorState}
      toggleStyle={toggleStyle}
      focused={focused}
      inlineStyle={'UNDERLINE'}
    >
      <UnderlineIcon />
    </StyleButton>
  </div>

const mapThemeToStyles = ({
  textField: {
    hintColor,
    focusColor,
  },
}) => ({
  focusColor,
  hintColor,
  buttons: {
    display: 'inline-block',
    float: 'right',
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    width: 24,
    height: 24,
    padding: 2,
  },
})

export default withStyleSheet(mapThemeToStyles)(EditorCommands)
