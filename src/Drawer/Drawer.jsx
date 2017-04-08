import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiDrawer from 'material-ui/Drawer'
import { observer } from 'mobx-react'

import withStyles from '../theme/withStyles'
import { trans as transitions } from '../styles/animations'


@observer
class Drawer extends Component {

  static childContextTypes = {
    drawerDomain: PropTypes.object.isRequired,
  }

  getChildContext = () => ({
    drawerDomain: this.props.domain,
  })

  render() {
    const {
      styles,
      domain,
      children,
    } = this.props
    return (
      <nav style={styles.nav}>
        <MuiDrawer
          containerStyle={styles.drawer}
          docked={domain.docked}
          open={domain.open}
          onRequestChange={domain.setWantOpen}
        >
          {children}
        </MuiDrawer>
      </nav>
    )
  }
}

const mapThemeToStyles = ({
  appBar,
  drawer,
  fillParent,
}, {
  domain,
}) => ({
  drawer: {
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: drawer.backgroundColor,
    transition: transitions.cubicAll,

    height: `calc(100% - ${domain.docked ? appBar.height : 0}px)`,
    marginTop: domain.docked ? appBar.height : 0,
    // transform: `translate3d(-${domain.docked ? 0 : drawer.width}px, ${domain.docked ? appBar.height : 0}px, 0)`,
  },
})

export default
  withStyles(mapThemeToStyles)(
    Drawer
  )
