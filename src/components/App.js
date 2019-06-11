import React, {Component} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import '../index.css';

import about from './aboutComponents/about'
import favorites from './Favorites'
import search from './searchComponents/search'

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
// function aboutUsTest() {
//   return <h1>ABOUT US!</h1>
// }
function signupTest() {
  return <h1>SIGNUP!</h1>
}
function loginTest() {
  return <h1>LOGIN!</h1>
}
function logoutTest() {
  return <h1>LOGOUT!</h1>
}

// function favoritesTest() {
//   return <h2>Favorites! :)</h2>
// }

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <header>
            <div className="navContainer">
              <img className="navItem" src='../icons8-volunteering-64.png'/>
              <Link className="navItem" to="/">Home</Link>
              <Link className="navItem" to="/about-us">About</Link>
              <Link className="navItem" to="/favorites">Favorites</Link>
              <Link className="navItem" to="/signup">Signup</Link>
              <Link className="navItem" to="/login">Log In</Link>
              <Link className="navItem" to="/logout">Log Out</Link>
            </div>
          </header>
          <section>
            <Route exact path="/" component={search}/>
            <Route exact path="/about-us" component={about}/>
            <Route exact path="/favorites" component={favorites} />
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