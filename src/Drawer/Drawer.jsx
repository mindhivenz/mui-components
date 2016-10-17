import React, { Component, PropTypes } from 'react'
import MuiDrawer from 'material-ui/Drawer'
import { observer } from 'mobx-react'

import withTheme from '../theme/withTheme'


@observer
class Drawer extends Component {

  static childContextTypes = {
    drawerOnTouchTap: PropTypes.func.isRequired,
  }

  getChildContext = () => ({
    drawerOnTouchTap: this.drawerOnTouchTap,
  })

  drawerOnTouchTap = () => {
    const domain = this.props.domain
    if (! domain.docked) {
      domain.setOpen(false)
    }
  }

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
          onRequestChange={domain.setOpen}
        >
          {children}
        </MuiDrawer>
      </nav>
    )
  }
}

const calcStyles = ({
  appBar,
  drawer,
  fillParent,
}, {
  domain,
}) => ({
  // nav: fillParent,
  drawer: {
    backgroundColor: drawer.backgroundColor,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    height: `calc(100% - ${domain.docked ? appBar.height : 0}px)`,
    marginTop: domain.docked ? appBar.height : 0,
  },
})

export default withTheme(Drawer, calcStyles)
