import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { sessionReducer as session } from './session';
import  {devicesReducer as devices } from './devices'
import  {usersReducer as users } from './users'
import  {organizationsReducer as organizations } from './organizations'

const reducer = combineReducers({
  session,
  devices,
  users,
  organizations,
});

export { sessionActions } from './session';
export { devicesActions } from './devices';
export { usersActions } from './users';
export { organizationsActions } from './organizations';

export default configureStore({ reducer });