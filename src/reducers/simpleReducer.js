const defaultState = {
  searchTerm: '',
  city: '',
  stateChoice: 'Alabama'
}

export default(state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return {
        // Do Something
        ...state,
        searchTerm: action.payload
      }
    case 'UPDATE_CITY':
      return {
        ...state,
        city: action.payload
      }
    case 'UPDATE_STATE_CHOICE':
      return {
        ...state,
        stateChoice: action.payload
      }
    default:
      return state
  }
}