import { action, observable, computed } from 'mobx'
import { app } from '@mindhive/di'
import { createTheme } from './createTheme'

import blueGreyThemeDarkBody from './themes/blueGreyThemeDarkBody'
import brightBlueTheme from './themes/brightBlueTheme'


const DEFAULT_THEME = brightBlueTheme

const THEME_ID_PATH = 'themeId'

class ThemeDomain {

  themes = [
    blueGreyThemeDarkBody,
    brightBlueTheme,
  ]

  @observable mobile = false
  @observable themeId = null
  @observable defaultThemeId = DEFAULT_THEME.id
  @observable calcComponentsStyles = null

  constructor() {
    this.themeId = app().storage.read(THEME_ID_PATH)
  }

  createMuiTheme = (themeId, themeOverrides) => {
    const findThemeId = themeId || this.defaultThemeId
    const foundTheme = this.themes.find(t => t.id === findThemeId)
    return createTheme(
      this.mobile,
      foundTheme || DEFAULT_THEME,
      themeOverrides
    )
  }

  createMuiThemeForId = themeId =>
    this.createMuiTheme(themeId, this.calcComponentsStyles)

  @computed get muiTheme() {
    return this.createMuiTheme(this.themeId, this.calcComponentsStyles)
  }

  @action setThemeId = (themeId) => {
    this.themeId = themeId
    app().storage.write(THEME_ID_PATH, themeId)
  }

  @action setDefaultThemeId = (themeId) => {
    this.defaultThemeId = themeId
  }

  @action onCalcComponentStyles = (calcComponentsStyles) => {
    this.calcComponentsStyles = calcComponentsStyles
  }

  // TODO: This should be achieved through onCalcComponentStyles or similar
  @action setMobile = () => {
    this.mobile = true
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
