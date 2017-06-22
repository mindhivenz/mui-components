import React from 'react'
import { observer } from 'mobx-react'

import {compose, branch, renderNothing,mapProps} from 'recompose'

import inject from '@mindhive/mobx/inject'

import { injectStylesSheet } from './PageLayoutStyles'

const PageHeader = ({
  title,
  description,
  force,
  styles: { pageHeader },
  prepareStyles,
}) =>
  <header style={force ? pageHeader.rootForce : pageHeader.root}>
    <span style={prepareStyles(pageHeader.title)}>{title}</span>
    {description && <span style={prepareStyles(pageHeader.description)}>{description}</span>}
  </header>

export default compose(
  inject(['pageHeaderDomain']),
  observer,
  branch(
    ({ pageHeaderDomain = {}, force }) => ! (pageHeaderDomain.showHeader || force),
    renderNothing,
  ),
  mapProps(({
    pageHeaderDomain = {},
    title,
    description,
    ...rest,
  }) => ({
    title: title || pageHeaderDomain.title,
    description: description || pageHeaderDomain.description,
    ...rest,
  })),
  injectStylesSheet,
)(PageHeader)
