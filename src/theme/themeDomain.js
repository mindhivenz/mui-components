import { action, observable, computed } from 'mobx'
import createTheme from './createTheme'

import blueGreyThemeDarkBody from './themes/blueGreyThemeDarkBody'
import brightBlueTheme from './themes/brightBlueTheme'


const defaultTheme = blueGreyThemeDarkBody

class ThemeDomain {

  themes = [
    blueGreyThemeDarkBody,
    brightBlueTheme,
  ]

  @observable mobile = false
  @observable web = true
  @observable themeId = null
  @observable calcComponentsStyles = null

  createMuiTheme = (themeId, themeOverrides) => {
    const theme = (themeId && this.themes.find(t => t.id === themeId)) || defaultTheme
    return createTheme(this.mobile, this.web, theme, themeOverrides)
  }

  createMuiThemeForId = (themeId) => this.createMuiTheme(themeId, this.calcComponentsStyles)

  @computed get muiTheme() {
    return this.createMuiTheme(this.themeId, this.calcComponentsStyles)
  }

  @action setThemeId = (themeId) => {
    this.themeId = themeId
  }

  @action onCalcComponentStyles = (calcComponentsStyles) => {
    this.calcComponentsStyles = calcComponentsStyles
  }

  @action setMobile = () => {
    this.mobile = true
  }

  @action setWeb = () => {
    this.web = true
  }

  registerTheme = (theme) => {
    this.themes.push(theme)
  }

  prepareStyles = (...styles) =>
    this.muiTheme.prepareStyles(Object.assign({}, ...styles))

}

export default () => ({
  themeDomain: new ThemeDomain(),
})
