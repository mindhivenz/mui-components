import React from 'react'
import { observer } from 'mobx-react'
import { EditorState, RichUtils, Editor, convertFromRaw, convertToRaw } from 'draft-js'
import withStyleSheet from '../theme/withStyleSheet'

import EditorUnderline from './components/EditorUnderline'
import EditorLabel from './components/EditorLabel'
import EditorCommands from './components/EditorCommands'

@observer
class DraftEditor extends React.Component {

  constructor(props) {
    super(props)

    this.initialInputValue = props.input.value
    this.initialEditorState = this.initialInputValue ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(this.initialInputValue))) :
      EditorState.createEmpty()
    this.state = {
      editorState: this.initialEditorState,
      focused: false,
    }
  }

  onChange = (editorState) => {
    const { input } = this.props
    const currentContent = editorState.getCurrentContent()
    /*
      The following is to work out if the content has actually changed.
      // TODO remove when caps stored as JSON. Have a default empty state for
     */
    if (this.initialInputValue) {
      const currentRawContent = convertToRaw(currentContent)
      const isEqual = convertToRaw(this.initialEditorState.getCurrentContent()) === currentRawContent
      if (! isEqual) {
        input.onChange(JSON.stringify(currentRawContent))
      }
    } else if (currentContent.hasText()) {
      input.onChange(JSON.stringify(convertToRaw(currentContent)))
    } else {
      input.onChange(this.initialInputValue)
    }
    this.setState({ editorState })
  }

  toggleStyle = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ))
  }

  _setFocus = (focused) => {
    this.setState({ focused })
  }

  _handleOnBlur = () => {
    this._setFocus(false)
  }

  _handleOnFocus = () => {
    this._setFocus(true)
  }

  focus = () => {
    this.editor.focus()
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  render() {
    const {
      labelText,
      theme,
      styles,
      prepareStyles,
    } = this.props
    const { focused, editorState } = this.state
    const content = editorState.getCurrentContent()
    return (
      <div style={prepareStyles(styles.content)} onClick={this.focus}>
        <EditorLabel
          focused={focused}
          shrink={focused || content.hasText()}
        >
          {labelText}
        </EditorLabel>
        <EditorCommands
          editorState={this.state.editorState}
          focused={focused}
          toggleStyle={this.toggleStyle}
        />
        <div style={prepareStyles(styles.editor)}>
          <Editor
            ref={node => { this.editor = node }}
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            onFocus={this._handleOnFocus}
            onBlur={this._handleOnBlur}
          />
          <EditorUnderline focus={focused} />
        </div>

      </div>
    )
  }
}

const mapThemeToStyles = ({
  spacing,
  typography,

  textField: {
    hintColor,
    focusColor,
  },
}, {
  containerStyle = {},
  editorStyle = {},
}) => ({
  focusColor,
  hintColor,
  label: {
    display: 'inline-block',
    position: 'relative',
    top: -5,

    fontSize: 13,
  },
  content: {
    position: 'relative',
    cursor: 'initial',

    fontSize: 16,
    lineHeight: '24px',
    width: '100%',
    display: 'inline-block',

    paddingTop: spacing.desktopGutterLess,
    paddingBottom: spacing.desktopGutterMini,

    ...containerStyle,
  },
  editor: {
    position: 'relative',
    width: 'calc(100% - 75px)',
    display: 'inline-block',
    paddingTop: spacing.desktopGutterMini,
    fontWeight: typography.fontWeight300,
    fontSize: 14,
    ...editorStyle,

  },
})

export default
  withStyleSheet(mapThemeToStyles)(
    observer(
      DraftEditor
    )
  )
