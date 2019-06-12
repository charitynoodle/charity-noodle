import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import '../index.css';

// IMPORT PAGE VIEWS
import search from './searchComponents/search'
import about from './aboutComponents/about'
import favorites from './favoritesComponents/Favorites'
import signup from './signupComponents/signup'
import login from './loginComponents/login'

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <header>
            <div className="navContainer">
              <img src="https://img.icons8.com/metro/26/000000/volunteering.png" />
              <Link className="navItem" to="/">Home</Link>
              <Link className="navItem" to="/about-us">About</Link>
              <Link className="navItem" to="/favorites">Favorites</Link>
              <Link className="navItem" to="/signup">Signup</Link>
              <Link className="navItem" to="/login">Log In</Link>
              <Link className="navItem" to="/logout">Log Out</Link>
            </div>
          </header>
          <section>
            <Route exact path="/" component={search} />
            <Route exact path="/about-us" component={about} />
            <Route exact path="/favorites" component={favorites} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/login" component={login} />
            {/* <Route exact path="/logout" component={logoutTest}/> */}
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