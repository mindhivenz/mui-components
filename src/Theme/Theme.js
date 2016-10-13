import { action, observable, computed } from 'mobx'
import createTheme from './themeReducerLegacy'
import singleton from 'singleton'

import blueGreyThemeDarkBody from './themes/blueGreyThemeDarkBody'
import brightBlueTheme from './themes/brightBlueTheme'

const defaultTheme = blueGreyThemeDarkBody

class Theme {

  blueGreyThemeDarkBody = blueGreyThemeDarkBody
  brightBlueTheme = brightBlueTheme

  themes = [
    blueGreyThemeDarkBody,
    brightBlueTheme
  ]

  @observable mobile = false
  @observable web = false
  @observable baseTheme = defaultTheme

  @computed get theme() {
    console.log('Theme.theme')
    return createTheme(this.mobile, this.web, this.baseTheme)
  }

  @action setTheme(theme) {
    this.baseTheme = theme
  }

  @action setMobile() {
    this.mobile = true
  }

  @action setWeb() {
    this.web = true
  }

}

const theme = new Theme()

export default theme
