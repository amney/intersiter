const SET_GLOBAL_CONFIG = 'GLOBAL_CONFIG'
const SET_LOCAL_CONFIG = 'LOCAL_CONFIG'

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

const initialState = {
  globalConfig: true,
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
    default:
      return state
  }
}
