import React, { Component } from 'react'
import * as actionCreators from '../../actions/simpleAction'
import { connect } from 'react-redux';


// const mapDispatchToProps = (dispatch) => ({
//     selectFav: (e) => dispatch(actionCreators.selectFav(e)),
// })

const SingleResult = (props) => {

  return (
    <div className="charityResult">
      <h3>{props.name}</h3>
      <p>EIN: {props.ein}</p>
      <p>{props.city}, {props.state}</p>
      <a href={props.url}>{props.url}</a>
      
      <input onClick= {(e) => {actionCreators.selectFav(e, props.ein)}} ein={props.ein} type="radio" /> Add to my favorites
    </div>
  )
}

// export default connect(null, mapDispatchToProps)(SingleResult)
export default SingleResult;