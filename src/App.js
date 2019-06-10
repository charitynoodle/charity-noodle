import React, {Component} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


function homeTest() {
  return <h1>HOME!</h1>
}
function aboutUsTest() {
  return <h1>ABOUT US!</h1>
}
function signupTest() {
  return <h1>SIGNUP!</h1>
}
function loginTest() {
  return <h1>LOGIN!</h1>
}
function logoutTest() {
  return <h1>LOGOUT!</h1>
}

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Log In</Link>
            <Link to="/logout">Log Out</Link>
          </header>
          <section>
            <Route exact path="/" component={homeTest}/>
            <Route exact path="/about-us" component={aboutUsTest}/>
            <Route exact path="/signup" component={signupTest}/>
            <Route exact path="/login" component={loginTest}/>
            <Route exact path="/logout" component={logoutTest}/>
          </section>
        </React.Fragment>
      </Router>
    )
  }
}


// import {simpleAction} from './actions/simpleAction'
// const mapDispatchToProps = dispatch => ({
//   simpleAction: () => dispatch(simpleAction());
// })

// export default App;
export default connect()(App);