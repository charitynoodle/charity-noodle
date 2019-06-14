import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/simpleAction'

const mapStateToProps = store => {

}

const mapDispatchToProps = dispatch => ({
  loginUpdateUserName: (e) => dispatch(actionCreators.loginUpdateUsername(e.target.value)),
  loginUpdatePassword: (e) => dispatch(actionCreators.loginUpdatePassword(e.target.value)),
})


const login = (props) => {

  return (
    <div className="viewContainer">
      <div className="modalContainer">
        <input type="text" name="" id="" placeholder="Username" onChange={props.loginUpdateUserName} />
        <input type="text" name="" id="" placeholder="Password" onChange={props.loginUpdatePassword}/>
        <input type="submit" value="Submit" onClick={actionCreators.sendLoginInfo}/>
        <div>
          <div>
            <a className="google-btn" href="/auth/google">Login Wth Google+</a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect(null, mapDispatchToProps)(login)
