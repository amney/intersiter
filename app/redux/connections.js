const ADD_SITE = 'ADD_SITE'
const DEL_SITE = 'DEL_SITE'
const SAVE_CON = 'SAVE_CON'


export function saveCon(siteId, con) {
  return {
    type: SAVE_CON,
    siteId: siteId,
    con: con,
  }
}

const initialState = {
  "b82b5ea1-4deb-4fc1-aa51-71df1166f502": {
    address: "192.168.0.10",
    username: "admin",
    password: "password",
    inAddr: "127.0.0.1",
    https: false,
  }
}
export function connections(state = initialState, action) {
  switch (action.type) {
    case ADD_SITE:
      return Object.assign({}, state, {
        [action.siteId]: {
          address: "",
          username: "admin",
          password: "password",
          inAddr: "127.0.0.1",
          https: false,
        }
      }
      )
    case DEL_SITE:
      return {
        ...state,
      }
    case SAVE_CON:
      return Object.assign({}, state, {
        [action.siteId]: action.con
        }
      )
    default:
      return state
  }
}
