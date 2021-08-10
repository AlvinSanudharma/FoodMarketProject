import {combineReducers} from 'redux';
import {registerReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';

const rootReducer = combineReducers({
  registerReducer,
  photoReducer,
  globalReducer,
  homeReducer,
});

export default rootReducer;
