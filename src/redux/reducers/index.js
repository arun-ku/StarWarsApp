import { combineReducers } from 'redux';

import Planets from './Planets';
import Auth from './Auth';

const App = combineReducers({
  Planets,
  Auth,
});

export default App;