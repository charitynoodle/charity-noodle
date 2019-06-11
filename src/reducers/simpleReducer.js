const defaultState = {
  searchTerm: '',
  city: '',
  state: 'Alabama'
}

export default(state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return {
        // Do Something
      }
    default:
      return state
  }
}