import uuid from 'node-uuid'

const ADD_SITE = 'ADD_SITE'
const DEL_SITE = 'DEL_SITE'
const SET_NAME = 'SET_NAME'
const SAVE_EPGS = 'SAVE_EPGS'

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
  "b82b5ea1-4deb-4fc1-aa51-71df1166f502": {
    name: "New Site",
    reachable: true,
    sharedEpgs: {},
    consumableEpgs: {},
  }
}

export function sites(state = initialState, action) {
  switch (action.type) {
    case ADD_SITE:
      return {
        ...state,
        [action.siteId]: {
          name: "New Site",
          reachable: true,
          sharedEpgs: {},
          consumableEpgs: {},
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
    default:
      return state
  }
}
