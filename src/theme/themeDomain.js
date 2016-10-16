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

  createMuiThemeForId = (themeId) => {
    const theme = (themeId && this.themes.find(t => t.id === themeId)) || defaultTheme
    return createTheme(this.mobile, this.web, theme)
  }

  @computed get muiTheme() {
    return this.createMuiThemeForId(this.themeId)
  }

  @action setThemeId = (themeId) => {
    this.themeId = themeId
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
