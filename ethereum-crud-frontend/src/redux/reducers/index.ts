
// ** Initial State
const initialState = {
  items: [],
  connectFlag: false
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CONNECT_FLAG':
      return {
        ...state,
        connectFlag: action.payload
      }
    case 'ADD_ITEM':
      return {
        ...state,
        items: action.payload
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: action.payload
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: action.payload
      }
    case 'GET_ITEM':
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}

export default reducer
