import {combineReducers} from 'redux';
import {registerReducer, photoReducer} from './auth';
import {globalReducer} from './global';

const rootReducer = combineReducers({
  registerReducer,
  photoReducer,
  globalReducer,
});

export default rootReducer;
