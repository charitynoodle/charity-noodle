import React, { Component } from 'react'

const signup = () => {

  return (
    <div className="viewContainer">
      <div className="modalContainer">
        <div className="infoContainer">
          <div className="firstLine">
            <input type="text" name="" id="" placeholder="First Name"/>
            <input type="text" name="" id="" placeholder="Last Name"/>
          </div>
          <input type="text" name="" id="" placeholder="Email Address"/>
          <input type="text" name="" id="" placeholder="Username"/>
          <input type="text" name="" id="" placeholder="Password"/>
          <input type="submit" value="Submit"/>
          <div>
            <a href="#">Login with Facebook or Twitter</a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default signup
