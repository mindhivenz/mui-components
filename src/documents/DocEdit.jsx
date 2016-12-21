import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { FocusTrap } from 'react-hotkeys'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Overlay from 'material-ui/internal/Overlay'

import spacing from 'material-ui/styles/spacing'
import { ListItem } from 'material-ui/List'

import withTheme from '../theme/withTheme'
import { Icon, ClearIcon } from '../Icon'


const docEditContextTypes = {
  docEditForm: PropTypes.string,
}

export const withDocEditContext = (Comp) => {
  const component = (props, context) =>
    <Comp {...context} {...props} />
  component.contextTypes = docEditContextTypes
  return component
}

const animation = 300
const animationOut = 100

const mapThemeToStyles = (theme) => {
  const zIndex = 1400
  const selectedIconRoot = {
    marginTop: '32px',
  }
  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    container: {
      ...theme.paper,
      boxShadow: theme.paper.zDepthShadows[0],
      borderRadius: '2px',
      position: 'relative',
      willChange: 'opacity, max-height',
      overflow: 'hidden',
      transform: 'scale(1.025, 1)',
      maxHeight: '48px',

      // opacity: 0,
      // maxHeight: 0,
      // transition: `opacity ${animation} ease-out, max-height ${animation} ease-out`,
      // transition: `${transitions.easeOut(animation, 'all')}, max-height 0.15s ease-out`,

      zIndex: zIndex + 5,
    },
    shown: {
      opacity: 1,
      maxHeight: '2000px',
      transition: `opacity ${animation}ms ease-in, max-height ${animation}ms ease-in`,
      // transition: transitions.easeOut(`${animation}ms`, 'all'),
    },
    hidden: {
      opacity: 0.01,
      maxHeight: 0,
      transition: `opacity ${animationOut}ms ease-in, max-height ${animationOut}ms ease-in`,
      // transition: transitions.easeOut(`${animation}ms`, 'all'),
    },
    overlay: {
      zIndex,
    },
    name: {
      width: '210px',
      marginRight: `${spacing.desktopGutter}px`,
    },
    worksheet: {
      width: '210px',
    },
    icon: {
      marginTop: '42px',
      color: theme.palette.primary1Color,
    },
    buttons: {
      position: 'absolute',
      right: `${spacing.desktopGutter}px`,
      top: `${spacing.desktopGutterMore}px`,
      display: 'inline-block',
      textAlign: 'right',
    },
    save: {
      color: theme.palette.accent1Color,
      marginRight: spacing.desktopGutterMini,
    },
    close: {
      position: {
        height: 24,
        width: 24,
        padding: 0,
        margin: 0,
      },
      color: theme.palette.borderColor,
      hoverColor: theme.palette.errorText,
    },
    discard: {
      color: theme.palette.errorText,
      marginRight: spacing.desktopGutterMini,
    },
  }
}

class DocEdit extends Component {

  static childContextTypes = docEditContextTypes
  autoFocusChild = undefined

  state = {
    show: false,
  }

  getChildContext() {
    return {
      docEditForm: this.props.form,
    }
  }

  componentDidMount() {
    this.handleOpen()
    // setTimeout(() => this.handleOpen(), 0)
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimeout)
    clearTimeout(this.leaveTimeout)
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback)
  }

  componentWillAppear(callback) {
    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, 30px, 0)',
      },
    })

    this.enterTimeout = setTimeout(callback, 450) // matches transition duration
  }

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
      },
    })

    this.leaveTimeout = setTimeout(callback, 450) // matches transition duration
  }

  getAutoFocus = node => {
    console.log('getAutoFocus')
    console.log('node', node)
    if (this.firstFocusable === undefined) {
      this.firstFocusable = node
    }
    console.log('firstFocusable', this.firstFocusable)
  }

  handleClose(callback) {
    this.setState({
      show: false,
    })
    this.leaveTimeout = setTimeout(callback, animationOut) // matches transition duration
  }

  handleOpen() {
    this.setState({
      show: true,
    })
  }

  render() {
    const {
      docType,
      docIcon,
      onCancel,
      containerStyle,
      extraButtons,

      // auto
      styles,
      isNew,
      id,

      // react
      children,

      // redux-form
      error,
      processing,
      pristine,
      submitting,
      valid,
      handleSubmit,
    } = this.props

    const showClose = pristine && ! isNew
    const showButtons = ! pristine || isNew

    const itemId = `${docType}-list-item-${id || 'new'}-selector`

    const buttons = []
    if (showButtons) {
      buttons.push(
        <FlatButton
          label="Discard"
          style={styles.discard}
          onTouchTap={() => this.handleClose(onCancel)}
        />
      )
      buttons.push(
        <RaisedButton
          id={`submit-${docType}-selector`}
          label="save"
          style={styles.save}
          secondary
          type="submit"
          disabled={pristine || ! valid || submitting || processing}
        />
      )
    }
    if (extraButtons) {
      buttons.push(extraButtons)
    }
    if (showClose) {
      buttons.push(
        <IconButton
          onTouchTap={() => this.handleClose(onCancel)}
          style={styles.close.position}
        >
          <ClearIcon
            style={styles.close.position}
            color={styles.close.color}
            hoverColor={styles.close.hoverColor}
          />
        </IconButton>
      )
    }
    const lastBtn = buttons[buttons.length - 1]
    const lastFocusId = `${itemId}lastFocus`;

    const handleBlur = (e) => {
      if (e.target.id === lastFocusId) {
        console.log('Capture Blur')
        console.log(this.firstFocusable.getRenderedComponent())
        this.firstFocusable.getRenderedComponent().refs.component.input.focus()
      }
    }

    return (
      <FocusTrap
        focusName="nodeEditor"
        // onFocus={this.onFocus}
        onBlur={handleBlur}
      >
        <Overlay autoLockScrolling={false} style={styles.overlay} show={isNew || ! pristine} />
        <ListItem
          disableTouchRipple
          disableFocusRipple

          style={Object.assign({}, styles.container, containerStyle, this.state.show ? styles.shown : styles.hidden)}
          id={itemId}
          leftIcon={<Icon ligature={docIcon} style={styles.icon} />}
        >
          {error && <div style={styles.error}>{error.reason}</div>}
          <form
            id={`${docType}-form`}
            onSubmit={handleSubmit}
          >
            {React.Children.map(children, child => {
              const isFirstFocus = child && child.props && child.props.autoFocus === true
              return React.cloneElement(child, { withRef: isFirstFocus, ref: isFirstFocus ? this.getAutoFocus : undefined });
            })}
            <div style={styles.buttons}>
              {buttons.length &&
                buttons.map((button, idx) => React.cloneElement(button, {key: `btn-${idx}-key`, id: button === lastBtn ? lastFocusId : undefined}))
              }
            </div>
          </form>
        </ListItem>
      </FocusTrap>
    )
  }
}

const DocEditReduxForm = reduxForm()(
  withTheme(
    DocEdit,
    mapThemeToStyles,
  )
)

export default ({
  document = {},
  docType,
  id,
  ...otherProps
}) =>
  <DocEditReduxForm
    {...otherProps}
    document={document}
    docType={docType}
    isNew={! document._id}
    id={id}
    initialValues={document}
    form={`${docType}-form-${id || 'new'}`}
  />
