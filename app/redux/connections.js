import {refreshSite} from './sites'

const ADD_SITE = 'ADD_SITE'
const DEL_SITE = 'DEL_SITE'
const SAVE_CON = 'SAVE_CON'


function save(siteId, con){
  return {
    type: SAVE_CON,
    siteId: siteId,
    con: con,
  }
}

export function saveCon(siteId, con) {
  return function(dispatch) {
    dispatch(save(siteId, con))
    dispatch(refreshSite(siteId))
  }
}

export function deleteCon(siteId){
  return {
    type: DEL_SITE,
    siteId: siteId,
  }
}

const initialState = {
}
export function connections(state = initialState, action) {
  switch (action.type) {
    case ADD_SITE:
      return Object.assign({}, state, {
        [action.siteId]: {
          address: "",
          username: "admin",
          password: "password",
          inAddr: "",
          https: false,
        }
      }
      )
    case DEL_SITE:
      var nState = {...state}
      delete nState[action.siteId]
      return nState
    case SAVE_CON:
      return Object.assign({}, state, {
        [action.siteId]: action.con
        }
      )
    default:
      return state
  }
}
