import React from 'react'

/**
 * Use this instead of a <div>, <span> etc as the wrapper for multiple
 * components passed to rightIconMenu, rightAvatar etc in mui/ListItem to
 * avoid invalid props error by react
 */

// REVISIT: Remove this when/if MUI changes this
const PassPropsWrapper = ({
  children,
  style,
  ...other,
}) =>
  <div style={style}>
    {React.Children.map(children, child => React.cloneElement(child, { ...other }))}
  </div>

export default PassPropsWrapper
