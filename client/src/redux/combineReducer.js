import { combineReducers } from 'redux';

import authReducer from './auth/reducers/auth';
import expReducer from './auth/reducers/post';

export const reducers = combineReducers({ auth: authReducer, exp: expReducer });