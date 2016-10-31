import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { DragSource, DropTarget } from 'react-dnd'

const dragSource = ({
  canDrag = () => {},
  positionTarget = () => {},
  cancelPreviewPositionTarget = () => {},
}) => ({
  beginDrag(props) {
    return {
      id: props.id,
      dragIndex: props.index,
    }
  },

  canDrag() {
    return canDrag()
  },

  endDrag(props, monitor) {
    if (! monitor.didDrop()) {
      cancelPreviewPositionTarget()
      // app().orgProfileDomain.cancelPreviewPositionCap()
      return
    }
    const { id, dragIndex } = monitor.getItem()
    positionTarget(id, dragIndex)
    // app().orgProfileDomain.positionCap(id, dragIndex)
  },
})

const dragTarget = ({
  previewPositionTarget = () => {},
}) => ({
  canDrop() {
    return true
  },

  drop(target) {
    return target
  },

  hover(props, monitor, component) {
    const { id, dragIndex } = monitor.getItem()
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect() // eslint-disable-line react/no-find-dom-node

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    previewPositionTarget(id, hoverIndex)
    // app().orgProfileDomain.previewPositionCap(id, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().dragIndex = hoverIndex
  },
})


const withDragDrop = ({ itemType, canDrag, positionTarget, previewPositionTarget, cancelPreviewPositionTarget } = {}) =>
  (DecoratedComponent) => {

    @DropTarget(itemType, dragTarget({ previewPositionTarget }), connect => ({  // eslint-disable-line new-cap
      connectDropTarget: connect.dropTarget(),
    }))
    @DragSource(itemType, dragSource({ canDrag, positionTarget, cancelPreviewPositionTarget }), (connect, monitor) => ({  // eslint-disable-line new-cap
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }))
    class WithDragDrop extends Component {

      static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
      }

      render() {
        const {
          connectDragSource,
          connectDropTarget,
        } = this.props

        return connectDragSource(connectDropTarget(
          <div>
            <DecoratedComponent {...this.props} />
          </div>
        ))
      }
    }
    return WithDragDrop
  }
export default withDragDrop
