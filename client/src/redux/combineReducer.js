import { combineReducers } from 'redux';

import authReducer from './auth/reducers/auth';

export const reducers = combineReducers({ auth: authReducer });