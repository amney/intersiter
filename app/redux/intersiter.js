const SELECT_SITE = 'SELECT_SITE'
const DEL_SITE = 'DEL_SITE'

export function setSite(id) {
  return {
    type: SELECT_SITE,
    site: id,
  }
}

const initialState = {
  site: 0,
}

export function intersiter(state = initialState, action) {
  switch (action.type) {
    case SELECT_SITE:
      return {
        ...state,
        site: action.site,
      }
    case DEL_SITE:
      return {
        ...state,
        site: 0,
      }
    default:
      return state
  }
}
