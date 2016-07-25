import uuid from 'node-uuid'
import axios from 'axios'

const ADD_SITE = 'ADD_SITE'
const DEL_SITE = 'DEL_SITE'
const SET_NAME = 'SET_NAME'
const SAVE_EPGS = 'SAVE_EPGS'

const RSITE_REQ = 'RSITE_REQ'
const RSITE_EPGS = 'RSITE_EPGS'
const RSITE_EXT_EPGS = 'RSITE_EXT_EPGS'
const RSITE_ERROR = 'RSITE_ERROR'



function refreshSiteReq(siteId) {
  return {
    type: RSITE_REQ,
    siteId: siteId,
  }
}

function refreshSiteEpgs(siteId, epgs) {
  return {
    type: RSITE_EPGS,
    epgs: epgs,
    siteId: siteId,
  }
}

function refreshSiteExtEpgs(siteId, extEpgs) {
  return {
    type: RSITE_EXT_EPGS,
    extEpgs: extEpgs,
    siteId: siteId,
  }
}

function refreshSiteError(siteId, json) {
  return {
    type: RSITE_ERROR,
    data: json,
    siteId: siteId,
  }
}



export function refreshSite(siteId) {
  return function(dispatch, getState){
    const {connections, sites} = getState()

    const con = connections[siteId]
    const site = sites[siteId]

    console.log("Refreshing", site.name)
    dispatch(refreshSiteReq(siteId))

    axios.post(`${con.https ? 'https' : 'http'}://${con.address}/api/aaaLogin.json`,{
        aaaUser: {
          attributes: {
            name: "admin",
            pwd: "ins3965!"
          }
        }
      })
      .then((response) => {
        let result = response.data

        result = result.imdata[0]
        if(result.error) {
          console.log('Could not auth')
        } else {
          var token = result.aaaLogin.attributes.token
          axios.defaults.headers.common["devcookie"] = token
        }

        axios.get(`${con.https ? 'https' : 'http'}://${con.address}/api/node/class/fvAEPg.json`)
        .then((response) => dispatch(refreshSiteEpgs(siteId, response.data.imdata)))

        axios.get(`${con.https ? 'https' : 'http'}://${con.address}/api/node/class/l3extInstP.json`)
        .then((response) => dispatch(refreshSiteExtEpgs(siteId, response.data.imdata)))
			})
			.catch((response) => {
				dispatch(refreshSiteError(siteId, response.data))
			})

  }
}

export function addSite() {
  let uid = uuid.v4()
  return {
    type: ADD_SITE,
    siteId: uid,
  }
}

export function delSite(siteId) {
  return {
    type: DEL_SITE,
    siteId: siteId,
  }
}

export function saveEpgs(siteId, epgType, epgs) {
  return {
    type: SAVE_EPGS,
    siteId: siteId,
    epgType: epgType,
    epgs: epgs
  }
}

export function setName(siteId, name) {
  return {
    type: SET_NAME,
    siteId: siteId,
    name: name,
  }
}

const initialState = {
}

export function sites(state = initialState, action) {
  switch (action.type) {
    case ADD_SITE:
      return {
        ...state,
        [action.siteId]: {
          name: "New Site",
          reachable: 0,
          sharedEpgs: {},
          consumableEpgs: {},
          epgs: [],
          extEpgs: [],
        }
      }
    case DEL_SITE:
      return {
        ...state,
      }
    case SET_NAME:
      return {
        ...state,
        [action.siteId]: {
          ...state[action.siteId],
          name: action.name,
        }
      }
    case SAVE_EPGS:
      return {
        ...state,
        [action.siteId]: {
          ...state[action.siteId],
          [action.epgType]: action.epgs,
        }
      }

    case RSITE_REQ:
      return {
        ...state,
        [action.siteId]: {
          ...state[action.siteId],
          reachable: 0,
        }
      }

    case RSITE_EPGS:
      return {
        ...state,
        [action.siteId]: {
          ...state[action.siteId],
          epgs: action.epgs,
          reachable: 1,
        }
      }
    case RSITE_EXT_EPGS:
      return {
        ...state,
        [action.siteId]: {
          ...state[action.siteId],
          extEpgs: action.extEpgs,
          reachable: 1,
        }
      }
    case RSITE_ERROR:
      return {
        ...state,
        [action.siteId]: {
          ...state[action.siteId],
          reachable: -1,
        }
      }
    default:
      return state
  }
}
