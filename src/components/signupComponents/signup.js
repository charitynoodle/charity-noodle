import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/simpleAction'


const mapStateToProps = store => ({
  firstName: store.simpleReducer.signup.firstName,
  lastName: store.simpleReducer.signup.lastName,
  emailAddr: store.simpleReducer.signup.emailAddr,
  userName: store.simpleReducer.signup.userName,
  password: store.simpleReducer.signup.password
})

const mapDispatchToProps = dispatch => {
  return {
    signupUpdateFirstName: (e) => dispatch(actionCreators.signupUpdateFirstName(e.target.value)),
    signupUpdateLastName: (e) => dispatch(actionCreators.signupUpdateLastName(e.target.value)),
    signupUpdateEmailAddr: (e) => dispatch(actionCreators.signupUpdateEmailAddr(e.target.value)),
    signupUpdateUserName: (e) => dispatch(actionCreators.signupUpdateUserName(e.target.value)),
    signupUpdatePassword: (e) => dispatch(actionCreators.signupUpdatePassword(e.target.value))
  }
}




const Signup = (props) => {

  return (
    <div className="viewContainer">
      <div className="modalContainer">
        <div className="infoContainer">
          <div className="firstLine">
            <input onChange={props.signupUpdateFirstName} type="text" name="" id="" placeholder="First Name"/>
            <input onChange={props.signupUpdateLastName} type="text" name="" id="" placeholder="Last Name"/>
          </div>
          <input onChange={props.signupUpdateEmailAddr} type="text" name="" id="" placeholder="Email Address"/>
          <input onChange={props.signupUpdateUserName} type="text" name="" id="" placeholder="Username"/>
          <input onChange={props.signupUpdatePassword} type="text" name="" id="" placeholder="Password"/>
          <input onClick={actionCreators.sendSignupInfo} type="submit" value="Submit"/>
          <div>
            <a href="#">Login with Google</a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup)
