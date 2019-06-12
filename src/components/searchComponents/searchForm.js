import React, { Component } from 'react'
import StateDropdown from './stateDropdown'
import * as actionCreators from '../../actions/simpleAction'
import { connect } from 'react-redux';


const mapStateToProps = function(store) {
  return {
    // Add pertinent state here
    searchTerm: store.searchTerm,
    city: store.city,
    stateChoice: store.stateChoice
  }

}

const mapDispatchToProps = function(dispatch) {
  return {
    updateSearchTerm: (e) => dispatch(actionCreators.updateSearchTerm(e.target.value)),
    updateCity: (e) => dispatch(actionCreators.updateCity(e.target.value)),
    updateStateChoice: (e) => dispatch(actionCreators.updateStateChoice(e.target.value))
  }
}

const SearchForm = (props) => {
  // Beep :] 
  // Bop >:(

  return (
    <div> 
      <form>
          <h2>Search for charities</h2>
          <input type="text" placeholder="Search term" onChange={props.updateSearchTerm}></input>
          <br />
          <input type="text" placeholder="City" onChange={props.updateCity}></input>
          <StateDropdown updateStateChoice={props.updateStateChoice}/>
          <input type="submit" placeholder="Submit" ></input>
      </form>
    </div>
  )
}





export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);