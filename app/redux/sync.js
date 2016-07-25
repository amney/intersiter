import uuid from 'node-uuid'
import axios from 'axios'

const CFG_INTERSITERS_REQ = 'CFG_INTERSITERS_REQ'

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

const INCR_SITE_INDEX = 'INCR_SITE_INDEX'

const CFG_INTERSITERS_DONE = 'CFG_INTERSITERS_DONE'


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


function doneGenerateConf() {
  return {
    type: B_CONF,
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

  var siteObj = {
    site:{
      name: site.name,
      ip_address: con.address,
      username: con.username,
      password: con.password,
      use_https: con.https,
      local: true
    }
  }

  var exports = []

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

    exports.push(exportObj)
  })


  configObj.config.push(siteObj)
  configObj.config.push(exports)

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


      //TODO: Post the actual configuration here
      axios.get('http://127.0.0.1:8080')
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
				dispatch(pushConfigError(id, response.data))
			})
  }
}

function doneSiteReachability(){
  return function(dispatch, getState){
    const {sites, connections, sync} = getState()

    // Generate configuration for each site
    dispatch(beginGenerateConf())
    setTimeout(() => {

    Object.keys(sites).map((k) => {
      var site = sites[k]

      const config = createConfigForSite(k, sites, connections)
      dispatch(stageConfigForSite(k, config))
      dispatch(incrSiteIndex())
    })

    // Push configuration to each site
    dispatch(beginPushConf())
    setTimeout(() => dispatch(pushConfig(0)), 2000)


    }, 2000)
  }
}

function testSite(id){
  return function(dispatch, getState){
    const {sync} = getState()

      //TODO: Test the API is reachable
      axios.get('http://127.0.0.1:8080')
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
				dispatch(siteReachError(id, response.data))
			})
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
    setTimeout(() => dispatch(testSite(0)), 2000)
  }
}

const initialState = {
  syncing: false,
  siteId: null,
  siteIndex: 0,
  stage: 0,
  json: null,
  error: false,
  sites: [],
  conf: {}
}

export function sync(state = initialState, action) {
  switch (action.type) {
    case CFG_INTERSITERS_REQ:
      return {
        ...state,
        syncing: true,
        stage: 0,
        sites: action.sites
      }
    case CFG_INTERSITERS_DONE:
      return {
        ...state,
        stage: 3,
        syncing: false
      }
    case INCR_SITE_INDEX:
      var curIdx = state.siteIndex
      var newIdx = curIdx + 1

      if(newIdx >= state.sites.length) newIdx = 0

      return {
        ...state,
        siteIndex: newIdx
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
        error: true,
        message: 'Failed to reach site'
      }

    case PC_ERROR:
      return {
        ...state,
        error: true,
        message: 'Failed to push configuration'
      }

    default:
      return state
  }
}
