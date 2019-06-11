import React, { Component } from 'react'

import StateDropdown from './stateDropdown'

const SearchForm = () => {
  let a = 3;


  return (
    <div> 
      <form>
          <h2>Search for charities</h2>
          <input type="text" value="Search term"></input>
          <br />
          <input type="text" value="City"></input>

          <StateDropdown />
          <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}


export default SearchForm;