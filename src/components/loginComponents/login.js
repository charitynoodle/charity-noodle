import React, { Component } from 'react'

const login = () => {

  return (
    <div className="viewContainer">
      <div className="modalContainer">
        <input type="text" name="" id="" placeholder="Username"/>
        <input type="text" name="" id="" placeholder="Password"/>
        <input type="submit" value="Submit"/>
        <div>
          <a href="#">Login with Facebook or Twitter</a>
          <div></div>
          <div>
          <a class="google-btn" href="/auth/google">Login Wth Google+</a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default login
