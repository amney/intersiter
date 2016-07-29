import axios from 'axios'

// Listen for modified configuration
const SAVE_EPGS = 'SAVE_EPGS'

// Begin, increment, and finish a job
const INCR_SITE_INDEX = 'INCR_SITE_INDEX'
const CFG_INTERSITERS_REQ = 'CFG_INTERSITERS_REQ'
const CFG_INTERSITERS_DONE = 'CFG_INTERSITERS_DONE'

// Site Reachability
const B_SITE_REACH = 'B_SR'
const SR_REQ = 'SR_REQ'
const SR_RESP = 'SR_RESP'
const SR_ERROR = 'SR_ERROR'

// Generate Configuration
const B_CONF = 'B_CF'
const STAGE_CONF = 'STAGE_CONF'

// Push Configuration
const B_PSH_C = 'B_PC'
const PC_REQ = 'PC_REQ'
const PC_RESP = 'PC_RESP'
const PC_ERROR = 'PC_ERROR'

function incrSiteIndex(){
  return {
    type: INCR_SITE_INDEX,
  }
}

function configIntersitersReq(sites) {
  return {
    type: CFG_INTERSITERS_REQ,
    sites: sites,
  }
}

function configIntersitersDone() {
  return {
    type: CFG_INTERSITERS_DONE,
  }
}

function beginSiteReachability() {
  return {
    type: B_SITE_REACH,
  }
}

function beginGenerateConf() {
  return {
    type: B_CONF,
  }
}

function beginPushConf() {
  return {
    type: B_PSH_C,
  }
}


function stageConfigForSite(siteId, config){
  return {
    type: STAGE_CONF,
    siteId: siteId,
    config: config,
  }
}


function siteReachError(siteId, json) {
  return {
    type: SR_ERROR,
    siteId: siteId,
    data: json,
  }
}

function pushConfigError(siteId, json) {
  return {
    type: PC_ERROR,
    siteId: siteId,
    data: json,
  }
}

function createConfigForSite(key, sites, connections){
  var site = sites[key]
  var con = connections[key]

  var deltaSites = Object.assign({}, sites)
  delete deltaSites[key]

  var configObj = {
    config: []
  }

  var config = []

  var siteObj = {
    site:{
      name: site.name,
      ip_address: con.address,
      username: con.username,
      password: con.password,
      use_https: con.https ? 'True' : 'False',
      local: 'True'
    }
  }

  config.push(siteObj)

  Object.keys(deltaSites).map((k) => {
    var otherSite = sites[k]
    var otherSiteCon = connections[k]

    var  otherSiteObj = {
      site:{
        name: otherSite.name,
        ip_address: otherSiteCon.address,
        username: otherSiteCon.username,
        password: otherSiteCon.password,
        use_https: otherSiteCon.https ? 'True' : 'False',
        local: 'False'
      }
    }

    config.push(otherSiteObj)
  })

  Object.keys(site.sharedEpgs).map((k) => {
    var epg = site.sharedEpgs[k]
    console.log("Creating export for EPG", epg.name)

    var exportObj = {
      export:{
        tenant: epg.tenant,
        app: epg.ap,
        epg: epg.name,
        remote_epg: epg.name,
        remote_sites:[]
      }
    }


    Object.keys(deltaSites).map((k) => {
      var otherSite = sites[k]
      console.log("Preparing consumable EPGs for site", otherSite.name)


      var remote_site = {
          site:{
            name: otherSite.name,
            interfaces:[]
        }
      }

      Object.keys(otherSite.consumableEpgs).map((k) => {
        var consEpg = otherSite.consumableEpgs[k]
        console.log("Adding consumable EPG", consEpg.name)

        var consInterface = {
            l3out:{
              tenant: consEpg.tenant,
              name: consEpg.name,
              consumes_interface:[],
              protected_by:[],
              provides:[],
              consumes:[]
            }
        }

        remote_site.site.interfaces.push(consInterface)
      })

      exportObj.export.remote_sites.push(remote_site)
    })

    config.push(exportObj)
  })


  configObj.config = config
  console.log(configObj)

  return configObj
}

function pushConfig(id){
  return function(dispatch, getState){
      const {sites, connections, sync} = getState()
      const k = sync.sites[id] 

      var site = sites[k]
      var connection = connections[k]
      var config = sync.conf[k]

      setTimeout(() => {

      // Post the actual configuration here
      axios.post(`http://${connection.inAddr}/config`, config,
      {auth: {
      username: 'admin',
      password: 'acitoolkit'
      }})
      .then((response) => {
        let result = response.data
        dispatch(incrSiteIndex())
        const nextId = id + 1
        if(nextId < sync.sites.length)
          {
            dispatch(pushConfig(nextId))
          }
        else {
            dispatch(configIntersitersDone())
        }
			})
			.catch((response) => {
				dispatch(pushConfigError(sync.sites[id], response.data))
			})}, 1500)
  }
}

function buildSite(id){
  return function(dispatch, getState){
      const {sites, sync, connections} = getState()
      const k = sync.sites[id]

      setTimeout(() => {
      const config = createConfigForSite(k, sites, connections)
      dispatch(stageConfigForSite(k, config))
      dispatch(incrSiteIndex())

      const nextId = id + 1
      if(nextId < sync.sites.length)
        {
          dispatch(buildSite(nextId))
        }
      else {
          dispatch(beginPushConf())
          dispatch(pushConfig(0))
      }}, 1500)
  }
}

function doneSiteReachability(){
  return function(dispatch, getState){
    const {sites, connections, sync} = getState()

    // Generate configuration for each site
    dispatch(beginGenerateConf())

    dispatch(buildSite(0))
  }
}

function testSite(id){
  return function(dispatch, getState){
      const {sync, connections} = getState()
      const k = sync.sites[id] 
      var connection = connections[k]

    setTimeout(() => {

    // Test that the interister is up
    axios.get(`http://${connection.inAddr}/config`,
      {auth: {
      username: 'admin',
      password: 'acitoolkit'
      }})
      .then((response) => {
        let result = response.data
        dispatch(incrSiteIndex())
        const nextId = id + 1
        if(nextId < sync.sites.length)
          {
            dispatch(testSite(nextId))
          }
        else {
            dispatch(doneSiteReachability())
        }
			})
			.catch((response) => {
				dispatch(siteReachError(sync.sites[id], response.data))
			})
      }, 1500)
  }
}


export function configIntersiters() {
  return function(dispatch, getState){
    const {sites, connections, sync} = getState()

    // Set the task off
    var siteList = Object.keys(sites).map((k) => {return k})
    dispatch(configIntersitersReq(siteList))


    // Check that each site is reachable
    dispatch(beginSiteReachability())
    dispatch(testSite(0))
  }
}

const initialState = {
  syncing: false,
  pendingChanges: false,
  siteId: null,
  siteIndex: 0,
  stage: 0,
  json: null,
  error: false,
  sites: [],
  conf: {},
  message: ""
}

export function sync(state = initialState, action) {
  switch (action.type) {
    case CFG_INTERSITERS_REQ:
      return {
        ...state,
        syncing: true,
        error: false,
        message: "",
        stage: 0,
        siteIndex: 0,
        sites: action.sites
      }
    case CFG_INTERSITERS_DONE:
      return {
        ...state,
        stage: 3,
        syncing: false,
        pendingChanges: false,
      }
    case INCR_SITE_INDEX:
      var curIdx = state.siteIndex
      var newIdx = curIdx + 1

      if(newIdx >= state.sites.length) newIdx = 0

      return {
        ...state,
        siteIndex: newIdx
      }


    case SAVE_EPGS:
      return {
        ...state,
        pendingChanges: true,
      }


    case B_SITE_REACH:
      return {
        ...state,
        stage: 0
      }
    case B_CONF:
      return {
        ...state,
        stage: 1
      }
    case B_PSH_C:
      return {
        ...state,
        stage: 2
      }

    case STAGE_CONF:
      return {
        ...state,
        conf: {...state.conf, [action.siteId]: action.config}
      }


    case SR_ERROR:
      return {
        ...state,
        syncing: false,
        siteId: action.siteId,
        error: true,
        message: 'Failed to reach intersite tool'
      }

    case PC_ERROR:
      return {
        ...state,
        syncing: false,
        siteId: action.siteId,
        error: true,
        message: 'Failed to push configuration'
      }

    default:
      return state
  }
}
