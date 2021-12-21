import { combineReducers, configureStore } from '@reduxjs/toolkit';

import  {sessionReducer as session } from './session';
import  {devicesReducer as devices } from './devices'
import  {usersReducer as users } from './users'
import  {organizationsReducer as organizations } from './organizations'
import  {positionsReducer as positions } from './positions';

const reducer = combineReducers({
  session,
  devices,
  users,
  organizations,
  positions,
});

export { sessionActions } from './session';
export { devicesActions } from './devices';
export { usersActions } from './users';
export { organizationsActions } from './organizations';
export { positionsActions } from './positions'

export default configureStore({ reducer });