const SET_GLOBAL_CONFIG = 'GLOBAL_CONFIG'
const SET_LOCAL_CONFIG = 'LOCAL_CONFIG'
const SELECT_SITE = 'SELECT_SITE'

export function setGlobalConfig() {
  return {
    type: SET_GLOBAL_CONFIG,
    global: true,
  }
}

export function setLocalConfig() {
  return {
    type: SET_LOCAL_CONFIG,
    global: false,
  }
}

export function setSite(id) {
  return {
    type: SELECT_SITE,
    site: id,
  }
}

const initialState = {
  globalConfig: true,
  site: 0,
}

export function intersiter(state = initialState, action) {
  switch (action.type) {
    case SET_GLOBAL_CONFIG:
      return {
        ...state,
        globalConfig: true,
      }
    case SET_LOCAL_CONFIG:
      return {
        ...state,
        globalConfig: false,
      }
    case SELECT_SITE:
      return {
        ...state,
        globalConfig: false,
        site: action.site,
      }
    default:
      return state
  }
}
