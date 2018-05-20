import axios from 'axios';
const CancelToken = axios.CancelToken;

import {
  GET_PLANET_START,
  GET_PLANET_SUCCESS,
  GET_PLANET_ERROR,
  CLEAR_PLANET_DATA,
  LOAD_MORE_START,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_ERROR,
} from '../../Constants';

axios.defaults.baseURL = 'https://swapi.co/api/';

let tokens = {

};

export const search = ({ search, messageManager }) => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_PLANET_DATA,
    });
    dispatch({
      type: GET_PLANET_START
    });
    Object.keys(tokens).forEach((key) => {
      tokens[key]();
    });
    return axios.get('/planets', {
      params: {
        search: search,
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        tokens[search] = c;
      })
    })
      .then((res) => {
        if (res.data && res.data.results && res.data.results.length) {
          dispatch({
            type: GET_PLANET_SUCCESS,
            payload: res.data,
          })
        } else {
          dispatch({
            type: GET_PLANET_ERROR,
          })
        }
      })
      .catch(e => {})
  }
};

export const loadMore = ({ url, messageManager }) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_MORE_START,
    });
    Object.keys(tokens).forEach((key) => {
      tokens[key]();
    });
    return axios.get(url, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        tokens[search] = c;
      })
    })
      .then((res) => {
        if (res.data && res.data.results && res.data.results.length) {
          dispatch({
            type: LOAD_MORE_SUCCESS,
            payload: res.data,
          })
        } else {
          messageManager.showErrorMessage('An Error occurred while loading data', {
            displayTime: 4000,
          });
          dispatch({
            type: LOAD_MORE_ERROR,
          })
        }
      })
      .catch(e => {})
  }
};

