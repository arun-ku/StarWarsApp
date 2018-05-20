import {
  STATUS,
  GET_PLANET_START,
  GET_PLANET_SUCCESS,
  GET_PLANET_ERROR,
  CLEAR_PLANET_DATA,
  LOAD_MORE_START,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_ERROR,
} from '../../Constants'

export default (state = {
  planets: [],
}, action) => {
  switch (action.type) {
    case GET_PLANET_START:
      return Object.assign({}, state, { getPlanetStatus: STATUS.LOADING });
    case GET_PLANET_SUCCESS:
      let { results: planets, next, count } = action.payload;
      return Object.assign({}, state, { getPlanetStatus: STATUS.SUCCESS, planets, count, next });
    case GET_PLANET_ERROR:
      return Object.assign({}, state, { getPlanetStatus: STATUS.ERROR });
    case CLEAR_PLANET_DATA:
      return Object.assign({}, state, { getPlanetStatus: null, planets: [], count: 0, next: '' });
    case LOAD_MORE_START:
      return Object.assign({}, state, { loadMoreStatus: STATUS.LOADING });
    case LOAD_MORE_SUCCESS:
      let { results, next: lmNext, count: lmCount } = action.payload;
      return Object.assign(
        {},
        state,
        {
          loadMoreStatus: STATUS.SUCCESS,
          planets: [...state.planets, ...results],
          count: lmCount, next: lmNext
        }
      );
    case LOAD_MORE_ERROR:
      return Object.assign({}, state, { loadMoreStatus: STATUS.ERROR });
    default:
      return state;
  }
};