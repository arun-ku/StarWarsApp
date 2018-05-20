import React, { Component, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './Auth/Login'
import Search from './Search'

import styles from './styles';

@withStyles(styles)
class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/search" component={Search} />
        </Fragment>
      </Router>
    );
  }
}

export default App;