import axios from 'axios';

import {
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGOUT,
} from '../../Constants';

axios.defaults.baseURL = 'https://swapi.co/api/';

export const doLogin = ({ name, password, messageManager }) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_START,
    });
    return axios.get('/people', {
      params: {
        search: name,
      }
    }).then(res => {
      if (res.data.results && res.data.results.length) {
        const person = res.data.results[0];
        if (person.name === name && person.birth_year === password) {
          localStorage.setItem('authData', JSON.stringify({
            isLoggedIn: true,
            person: person,
          }));
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: person,
          });
          return true;
        } else {
          dispatch({
            type: LOGIN_USER_ERROR,
          });
          messageManager.showErrorMessage('Wrong name or password', {
            displayTime: 5000,
          });
          return false;
        }
      } else {
        dispatch({
          type: LOGIN_USER_ERROR,
        });
        messageManager.showErrorMessage('Wrong name or password', {
          displayTime: 5000,
        });
        return false;
      }
    })
  }
};

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT,
    });
    localStorage.setItem('authData', '')
  }
};