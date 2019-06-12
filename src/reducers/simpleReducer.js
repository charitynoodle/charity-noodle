const defaultState = {
  searchTerm: '',
  city: '',
  stateChoice: 'AL',
  loading: false,
  error: false,
  data: []
}

export default (state = defaultState, action) => {
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
    case 'FETCHING_DATA':
      return {
        ...state,
        loading: true,
        error: false
      }
    case 'RECEIVED_DATA':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      }
    case 'RECEIVED_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      }

    default:
      return state


  }
}