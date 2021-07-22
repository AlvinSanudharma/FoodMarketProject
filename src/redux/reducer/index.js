import {combineReducers} from 'redux';
import {registerReducer} from './auth';
import {globalReducer} from './global';

const rootReducer = combineReducers({registerReducer, globalReducer});

export default rootReducer;
