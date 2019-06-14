import React, { Component } from 'react'
import store from '../../store'
import * as actionCreators from '../../actions/simpleAction'
import { connect } from 'react-redux';
import SingleResult from './singleResult'



const mapStateToProps = store => ({
  
  
    data: store.simpleReducer.data
  
})


const SearchResults = (props) => {

  console.log("PROPS: ", props)
  console.log("PROPS.DATA IS: ", props.data)

  if (props.data && props.data[0]) {
    console.log(Object.keys(props.data[0]));
    console.log(props.data[0].charityName);
  }

  const charitiesArray = props.data.map((charity, idx) => (
    <SingleResult key={idx} name={charity.charityName} ein={charity.ein} city={charity.city} state={charity.state} url={charity.url}/>
  )
)
  
  return (
    <div className="resultsContainer">
      {charitiesArray}
      <p>Hello There</p>
    </div>
  )
}

export default connect(mapStateToProps, null)(SearchResults);

// export default SearchResults FUCK THIS LINE OF CODE