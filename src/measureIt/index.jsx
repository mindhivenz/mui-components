import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const elementGetWidth = element => ReactDOM.findDOMNode(element).getBoundingClientRect().width
const elementGetHeight = element => ReactDOM.findDOMNode(element).getBoundingClientRect().height

const getParentWidth = element => ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().width
const getParentHeight = element => ReactDOM.findDOMNode(element).parentNode.getBoundingClientRect().height


const measureIt = ({ parent = false, getWidth, getHeight } = {}) =>
  DecoratedComponent => 
     class MeasureItHOC extends Component {

       constructor(...args) {
         super(...args)
         this.state = {
           containerWidth: 0,
           containerHeight: 0,
         }
       }

       componentDidMount() {
         this.resizeSensor.contentDocument.defaultView.addEventListener('resize', this.resizeListener.bind(this))

         this.measure()
       }

       componentWillUnmount() {
         this.resizeSensor.contentDocument.defaultView.removeEventListener('resize', this.resizeListener.bind(this))
       }

       getWindow() {
         return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window
       }

       requestFrame(fn) {
         const window = this.getWindow()
         const raf = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || function (fn) {
            return window.setTimeout(fn, 20)
          }
         return raf(fn)
       }

       cancelFrame(id) {
         const cancel = window.cancelAnimationFrame
          || window.mozCancelAnimationFrame
          || window.webkitCancelAnimationFrame
          || window.clearTimeout
         return cancel(id)
       }

       resizeListener() {
         if (this.animationFrame) {
           this.cancelFrame(this.animationFrame)
         }
         this.animationFrame = this.requestFrame(() => {
           this.onResize()
         })
       }

       onResize() {
         this.measure()
       }

       measure() {
         const getWidthFunc = getWidth || (parent && getParentWidth) || elementGetWidth
         const getHeightFunc = getHeight || (parent && getParentHeight) || elementGetHeight
         this.setState({
           containerWidth: getWidthFunc(this),
           containerHeight: getHeightFunc(this),
         })
       }

       render() {
         return (
           <div style={{ position: 'relative', top: 0, left: 0, height: '100%', width: '100%' }}>
             {(this.state.containerWidth || this.state.containerHeight) &&
             <DecoratedComponent {...this.props} {...this.state} />
            }
             <object
               ref={(o) => { this.resizeSensor = o }}
               data="about:blank"
               className="resize-sensor"
               style={{
                 display: 'block',
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 height: '100%',
                 width: '100%',
                 overflow: 'hidden',
                 pointerEvents: 'none',
                 zIndex: -1,
               }}
             />
           </div>
         )
       }
    }


export default measureIt
