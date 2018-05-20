import {
  STATUS,
  LOGIN_USER_START,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT,
} from '../../Constants'

let authData = {};
if (localStorage.getItem('authData')) {
  authData = JSON.parse(localStorage.getItem('authData'));
}
if (!authData) {
  authData = {};
}

export default (state = {
  isLoggedIn: authData.isLoggedIn,
  person: authData.person,
}, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return Object.assign({}, state, { loginStatus: STATUS.LOADING });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { loginStatus: STATUS.SUCCESS, isLoggedIn: true, person: action.payload });
    case LOGIN_USER_ERROR:
      return Object.assign({}, state, { loginStatus: STATUS.ERROR });
    case LOGOUT:
      return Object.assign({}, state, { loginStatus: STATUS.SUCCESS, isLoggedIn: false, person: {} });
    default:
      return state;
  }
};