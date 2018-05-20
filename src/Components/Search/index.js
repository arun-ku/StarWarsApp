import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { injectMessageManager } from 'react-message-manager';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';

import Planet from './Planet';

import { STATUS } from '../../redux/Constants'

import { search, loadMore, logout } from 'Actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  searchBar: {
    flex: 4,
    borderBottomColor: '#fff',
    marginRight: 80,
  },
  progressContainer: {
    position: 'fixed',
    left: '50%',
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 30,
    width: 30,
    textAlign: 'center',
    marginTop: -10,
    paddingTop: 2,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 48,
    marginTop: 80,
    color: '#95a5a6',
  },
  card: {
    width: '22%',
    height: 255,
    marginRight: '1%',
    display: 'inline-block',
    marginLeft: '2%',
    marginBottom: 20,
  },
  loadMoreIcon: {
    height: 120,
    width: 120,
  }
};

@withRouter
@injectMessageManager
@withStyles(styles)
class Search extends Component {

  state = {
    search: ''
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.props.history.push('/');
    }
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
    this.props.search({ search: e.target.value, messageManager: this.props.messageManager })
  };

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    const { classes, planets, getPlanetStatus, person, next, loadMore, messageManager, loadMoreStatus } = this.props;
    const { search } = this.state;
    const populationArray = planets.map((planet) => parseInt(planet.population))
      .filter(population => !isNaN(population))
      .sort((a, b) => (a - b) );
    return (
      <div className={classes.root}>
        <AppBar style={{ marginBottom: 20 }} position="static">
          <Toolbar>
            <TextField
              id="with-placeholder"
              label="Planet Name"
              placeholder="eg. Alderaan"
              className={classes.searchBar}
              margin="normal"
              value={search}
              onChange={(e) => this.handleChange(e, 'search')}
            />
            <Button onClick={this.handleLogout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        {
          getPlanetStatus !== STATUS.LOADING &&
          getPlanetStatus !== STATUS.ERROR &&
          getPlanetStatus !== STATUS.SUCCESS ? (
            <div className={classes.welcomeText}>
              Hello { person && person.name } !!! <br/>
              You can search for any planets here . <br/> <br/>
              May the force be with you. <br/>
            </div>
          ) : null
        }
        {
          getPlanetStatus === STATUS.ERROR && (
            <div className={classes.welcomeText}>
              No Planets Found
            </div>
          )
        }
        {
          (
            getPlanetStatus === STATUS.LOADING ||
            loadMoreStatus === STATUS.LOADING
          )  && (
            <div style={{ position: 'relative' }}>
              <div className={classes.progressContainer}>
                <CircularProgress size={25} className={classes.progress} />
              </div>
            </div>
          )
        }
        {
          (planets || []).map((planet) => {
            return (
              <Planet
                key={btoa(planet.name)}
                planet={planet}
                bigDogPopulation={populationArray[populationArray.length - 1]}
              />
            )
          })
        }
        {
          planets && planets.length && next ? (
            <Card className={classes.card}>
              <CardContent
                onClick={() => loadMore({ url: next, messageManager })}
                style={{ textAlign: '-webkit-center', color: '#95a5a6', paddingTop: '15%', cursor: 'pointer' }}
              >
                <div>
                  <AddIcon className={classes.loadMoreIcon} />
                </div>
                Load More
              </CardContent>
            </Card>
          ) : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getPlanetStatus: state.Planets.getPlanetStatus,
    planets: state.Planets.planets,
    next: state.Planets.next,
    person: state.Auth.person,
    isLoggedIn: state.Auth.isLoggedIn,
    loadMoreStatus: state.Planets.loadMoreStatus,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
        search,
        loadMore,
        logout,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);