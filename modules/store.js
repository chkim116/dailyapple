import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './user';

const rootReducer = combineReducers({user});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
