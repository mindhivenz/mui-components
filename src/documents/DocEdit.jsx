import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import withTheme from '../theme/withTheme'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Overlay from 'material-ui/internal/Overlay'

import spacing from 'material-ui/styles/spacing'
import { ListItem } from 'material-ui/List'
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
      ...selectedIconRoot,
      color: theme.palette.accent1Color,
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
    },
  }
}

class DocEdit extends Component {

  static childContextTypes = docEditContextTypes

  state = {
    show: false,
  }

  getChildContext() {
    return {
      docEditForm: this.props.form,
    }
  }

  componentDidMount() {
    setTimeout(() => this.handleOpen(), 0)
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

      // auto
      styles,
      isNew,
      docId,

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

    const rightIconButton = (
      <IconButton onTouchTap={() => this.handleClose(onCancel)} style={styles.close.position}>
        <ClearIcon style={styles.close.position} color={styles.close.color} hoverColor={styles.close.hoverColor} />
      </IconButton>
    )

    const itemKey = `${docType}-list-item-${docId || 'new'}-selector`

    return (
      <div>
        <Overlay autoLockScrolling={false} style={styles.overlay} show={isNew || ! pristine} />
        <ListItem
          disableTouchRipple
          style={Object.assign({}, styles.container, containerStyle, this.state.show ? styles.shown : styles.hidden)}
          id={itemKey}
          leftIcon={<Icon ligature={docIcon} style={styles.icon} />}
        >
          {error && <div style={styles.error}>{error.reason}</div>}
          <form
            id={`${docType}-form`}
            onSubmit={handleSubmit}
          >

            {children}

            <div style={styles.buttons}>
              {showClose ? rightIconButton : null}
              {showButtons &&
                <div>
                  <FlatButton
                    label="Discard"
                    style={styles.discard}
                    onTouchTap={() => this.handleClose(onCancel)}
                  />
                  <RaisedButton
                    id={`submit-${docType}-selector`}
                    label={'save'}
                    secondary
                    type="submit"
                    disabled={pristine || ! valid || submitting || processing}
                  />
                </div>
              }
            </div>
          </form>
        </ListItem>
      </div>
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
  ...otherProps,
}) =>
  <DocEditReduxForm
    {...otherProps}
    document={document}
    docType={docType}
    isNew={! document._id}
    docId={document._id}
    initialValues={document}
    form={`${docType}-form-${document._id || 'new'}`}
  />
