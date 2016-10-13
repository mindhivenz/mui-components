import { observable, action, computed } from 'mobx'
import { dispatchOf } from '../../client/redux/action'

import blueGreyThemeLightBody from './blueGreyThemeLightBody'
import blueGreyThemeDarkBody from './blueGreyThemeDarkBody'
import brightBlueTheme from './brightBlueTheme'
import enviroWasteTheme from './enviroWasteTheme'
import greenGorillaTheme from './greenGorillaTheme'

export const THEME_CHANGED = 'THEME_CHANGED'

export const themeChangeAction = dispatchOf(theme => ({
  type: THEME_CHANGED,
  theme,
}))

const defaultTheme = brightBlueTheme

class ThemeDomain {

  @observable defaultTheme = defaultTheme
  @observable baseTheme = defaultTheme
  @observable mobile = false
  @observable web = false

  get themes() {
    return [
      greenGorillaTheme,
      blueGreyThemeDarkBody,
      blueGreyThemeLightBody,
      enviroWasteTheme,
      brightBlueTheme,
    ]
  }

  @computed get theme() {
    return this.baseTheme
  }

  getTheme(id) {
    return this.themes.find(t => t.id === id) || defaultTheme
  }

  changeTheme(id) {
    this.setTheme(this.getTheme(id))
  }

  @action setTheme(theme) {
    this.baseTheme = theme || defaultTheme
    themeChangeAction(this.baseTheme)
  }

  @action setMobile() {
    this.mobile = true
  }

  @action setWeb() {
    this.web = true
  }

}

const domain = new ThemeDomain()
export default domain

