import { observer } from 'mobx-react'
import { compose, lifecycle } from 'recompose'
import inject from '@mindhive/mobx/inject'

import { withApiCallResult, withLatchedProps } from '@mindhive/meteor/client'

export default ({title, description}) => PageComponent => compose(
  inject(['pageHeaderDomain']),
  lifecycle({
    componentDidMount() {
      this.props.pageHeaderDomain && this.props.pageHeaderDomain.update(title, description)
    },
    componentWillUnmount() {
      this.props.pageHeaderDomain && this.props.pageHeaderDomain.update()
    },
  }),
)(PageComponent)
