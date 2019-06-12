import React, { Component } from 'react'


const SingleResult = (props) => {


  // return (
  //   <div>
  //     <h3>{props.name}</h3>
  //     <p>{props.city}, {props.state}</p>
  //     <a href={props.website}>{props.website}</a>
  //   </div>
  // )
  return (
    <div className="charityResult">
      <h3>{props.name}</h3>
      {/* <p>{props.ein}</p> */}
      <p>{props.city}, {props.state}</p>
      <a href={props.url}>{props.url}</a>
      
      <input type="radio" /> Add to my favorites
    </div>
  )
}

export default SingleResult