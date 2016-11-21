import React, { Component } from 'react'
import MuiDialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'

import EventListener from 'react-event-listener'
import keycode from 'keycode'

import withTheme from '../theme/withTheme'
import { ClearIcon } from '../Icon/Icon'


class Dialog extends Component {

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.primaryButton !== this.primaryButton) {
      this.primaryButton = nextProps.primaryButton
    }
    if (nextProps.secondaryButton !== this.secondaryButton) {
      this.secondaryButton = nextProps.secondaryButton
    }
    if (nextProps.closeButton !== this.closeButtonTouchTap) {
      this.closeButtonTouchTap = nextProps.closeButton
    }
  }

  handleKeyUp = (event) => {
    const key = keycode(event)
    if (key === 'esc') {
      if (this.closeButtonTouchTap) {
        this.closeButtonTouchTap()
      } else if (this.secondaryButton) {
        this.secondaryButton.onTouchTap()
      }
    } else if (key === 'enter' && this.primaryButton) {
      this.primaryButton.onTouchTap()
    }
  }


  render() {
    const {
      description,

      styles,
      prepareStyles,

      children,
      buttons,

      title,
      closeButton,

      ...other
    } = this.props

    const btns = []
    if (this.secondaryButton) {
      const Button = this.secondaryButton.primary ? RaisedButton : FlatButton
      const props = {
        primary: this.secondaryButton.primary || null,
      }
      if (this.secondaryButton.color) {
        props.backgroundColor = this.secondaryButton.color
        props.labelColor = styles.alternateTextColor
        props.primary = false
      }
      btns.push(
        <Button
          style={styles.secondary}
          key="secondaryButton"
          label={this.secondaryButton.label || 'Cancel'}
          disabled={this.secondaryButton.disabled}
          onTouchTap={this.secondaryButton.onTouchTap}
          {...props}
        />
      )
    }
    if (this.primaryButton) {
      const props = {
        primary: typeof this.primaryButton.primary === 'undefined' ? true : this.primaryButton.primary,
      }
      if (this.primaryButton.color) {
        props.backgroundColor = this.primaryButton.color
        props.labelColor = styles.alternateTextColor
        props.primary = false
      }
      btns.push(
        <RaisedButton
          style={styles.primary}
          key="primaryButton"
          disabled={this.primaryButton.disabled}
          label={this.primaryButton.label}
          onTouchTap={this.primaryButton.onTouchTap}
          {...props}
        />
      )
    }
    const dialogTitle = (
      closeButton ?
        <div>
          {title}
          <IconButton onTouchTap={this.closeButtonTouchTap} style={styles.close.button}>
            <ClearIcon style={styles.close.icon} color={styles.close.color} hoverColor={styles.close.hoverColor} />
          </IconButton>
        </div>
      :
        title
    )
    return (
      <MuiDialog
        ref={node => (this.dialog = node)}
        contentStyle={styles.content}
        bodyStyle={styles.body}
        titleStyle={styles.title}
        title={dialogTitle}
        modal
        {...other}
      >
        <EventListener
          target="window"
          onKeyUp={this.handleKeyUp}
        />

        <div style={prepareStyles(styles.description)}>{description}</div>
        {children}
        {btns.length || buttons ? <div style={styles.buttons}>{buttons}{btns.length > 0 && btns}</div> : null}
      </MuiDialog>
    )
  }
}

const calcStyles = ({
  dialog,
  spacing,
  palette,
}, {
  disabled,
  secondaryButton,
}) => {
  const secondary = {}
  if (secondaryButton) {
    if (secondaryButton.primary) {
      secondary.position = 'absolute'
      secondary.left = 0
    }
  }
  return ({
    ...dialog.root,
    title: disabled ? dialog.titleDisabled : dialog.title,
    secondary,
    alternateTextColor: palette.alternateTextColor,
    close: {
      button: {
        position: 'absolute',
        height: 33,
        width: 33,
        top: spacing.desktopGutterLess,
        right: spacing.desktopGutterLess,
        padding: 0,
      },
      icon: {
        position: 'absolute',
        height: 33,
        width: 33,
        top: 0,
        right: 0,
        padding: 0,
      },
      color: dialog.closeColor,
      hoverColor: dialog.closeHoverColor,
    },

  })
}

export default withTheme(Dialog, calcStyles)
