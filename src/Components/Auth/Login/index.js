import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { injectMessageManager } from 'react-message-manager';

import FormValidator from '../../ComponentDepencies/Utils/FormValidator';

import { doLogin } from 'Actions';
import { STATUS } from '../../../redux/Constants'

import styles from './styles';

@withRouter
@injectMessageManager
@withStyles(styles)
class App extends Component {

  state = {
    name: '',
    password: '',
    hasInvalidSubmitOccurred: false,
    errors: {},
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.history.push('/search');
    }
  }

  validateInputs = () => {
    const { name, password } = this.state;
    const formStatus = FormValidator.validateLoginForm({ name, password });

    this.setState({ errors: formStatus.errors });
    return !formStatus.hasErrors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = this.state;
    const { messageManager, loginStatus } = this.props;
    if (loginStatus === STATUS.LOADING) { return }
    if (!this.validateInputs()) {
      return this.setState({ hasInvalidSubmitOccurred: true })
    }
    messageManager.showSuccessMessage('Authenticating name and password. Please wait...', {
      displayTime: 500,
    });
    this.props.doLogin({ name, password, messageManager }).then((res) => {
      if (res === true) {
        this.props.history.push('/search');
        messageManager.showSuccessMessage('Logged In Successfully!', {
          displayTime: 4000,
        });
      }
    });
  };

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value }, this.validateInputs);
  };

  render() {
    const { classes, isLoggedIn, loginStatus } = this.props;
    const { name, password, hasInvalidSubmitOccurred, errors } = this.state;
    console.log('isLoggedIn', isLoggedIn)
    return (
      <div className={classes.root} >
        <Grid container direction="column" spacing={0} className={classes.container}>
          <Grid item>
            <Grid item xs={10} sm={5} className={classes.mxAuto}>
              <br />
              <Card>
                <CardContent className={classes.cardHeader}>
                  <Typography component="p" align="center" className={classes.headerText}>
                    LOGIN
                  </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <TextField
                        error={hasInvalidSubmitOccurred && !!errors.name}
                        id="with-placeholder1"
                        label="Name"
                        placeholder="eg. Luke Kumar"
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '100%' }}
                        value={name}
                        onChange={(e) => this.handleChange(e, 'name')}
                      />
                      <span className={classes.inputErrors}>{errors.name}</span>
                      </div>
                    <div>
                      <TextField
                        error={hasInvalidSubmitOccurred && !!errors.password}
                        id="with-placeholder"
                        label="Enter Password"
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        style={{ width: '100%' }}
                        value={password}
                        onChange={(e) => this.handleChange(e, 'password')}
                      />
                      <span className={classes.inputErrors}>{errors.password}</span>
                    </div>
                    <Button disabled={loginStatus === STATUS.LOADING} type="submit" variant="raised" color="primary" className={classes.button} style={{ width: '100%' }}>
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.Auth.isLoggedIn,
    loginStatus: state.Auth.loginStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      doLogin,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);