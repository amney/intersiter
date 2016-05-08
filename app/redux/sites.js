import uuid from 'node-uuid'

const ADD_SITE = 'ADD_SITE'
const DEL_SITE = 'DEL_SITE'

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

const initialState = {
  "b82b5ea1-4deb-4fc1-aa51-71df1166f502": {
    name: "New Site",
    reachable: true,
  }
}

export function sites(state = initialState, action) {
  switch (action.type) {
    case ADD_SITE:
      return Object.assign({}, state, {
        [action.siteId]: {
          name: "New Site",
          reachable: true
        }
      }
      )
    case DEL_SITE:
      return {
        ...state,
      }
    default:
      return state
  }
}
