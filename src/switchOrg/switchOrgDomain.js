import { observable, action, computed, toJS } from 'mobx'
import { app } from '@mindhive/di'


class SwitchOrgDomain {

  @observable _viewerOrg = null  // also used to indicate we're editing / dialog open
  @observable orgId = null
  @observable orgs = null

  @computed get dialogOpen() {
    return this._viewerOrg != null
  }

  @computed get pristine() {
    return this._viewerOrg === null || this.orgId === this._viewerOrg._id
  }

  @computed get description() {
    return this._viewerOrg && `Currently: ${this._viewerOrg.name}`
  }

  @computed get loading() {
    return ! this.orgs
  }

  @computed get canSwitch() {
    return this.orgs && this.orgs.length > 1
  }

  @computed get filteredOrgs() {
    return this._viewerOrg !== null && this.orgs
      ? this.orgs.filter(org => org._id !== this._viewerOrg._id)
      : []
  }

  @computed get defaultOrgId() {
    return this.filteredOrgs.length ? this.filteredOrgs[0]._id : null
  }

  @action start = () => {
    const { viewerDomain, api } = app()
    this._viewerOrg = toJS(viewerDomain.org)
    api.call('switchOrg.orgs.selectionList', { notifyViewerPending: false })
      .then(this._orgsLoaded)
  }

  @action _orgsLoaded = (orgs) => {
    this.orgs = orgs
    this.orgId = this.defaultOrgId
  }

  @action handleChange = (value) => {
    this.orgId = value
  }

  @action handleSwitch = () => {
    app().api.optimisticCall('switchOrg.viewer.switch', { orgId: this.orgId })
    document.location.replace('/')  // Refresh current page and go to dashboard
    this.tidyUp()  // kinda pointless, we're about to refresh anyway
  }

  @action cancel = () => {
    this.tidyUp()
  }

  tidyUp = () => {
    this.orgs = null
    this._viewerOrg = null
    this.orgId = null
  }

}

export default () => ({
  switchOrgDomain: new SwitchOrgDomain(),
})
