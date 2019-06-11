export default(state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        // Do Something
      }
    default:
      return state
  }
}