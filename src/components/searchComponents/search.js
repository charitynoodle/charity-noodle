import React from 'react'

import SearchForm from './searchForm'

const search = (props) => {
  //Something
 
  return (
    <div>
      <SearchForm />
    </div>
  )
  }


const mapStateToProps = function(state) {
  const { searchTerm, city, stateChoice } = state
  return {
    searchTerm,
    city,
    stateChoice
  }

}

const mapDispatchToProps = function(dispatch) {
  return {
    // increment: () => dispatch({type: 'INCREMENT', payload: 6})
    // decrement: () => dispatch({type: 'DECREMENT', payload: 5})
    // reset: () => dispatch({type: 'RESET'})
    
  }
}



// export default connect(mapStateToProps) 
export default search;