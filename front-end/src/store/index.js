import { combineReducers, configureStore } from '@reduxjs/toolkit';

import  {sessionReducer as session } from './session';
import  {devicesReducer as devices } from './devices'
import  {usersReducer as users } from './users'
import  {organizationsReducer as organizations } from './organizations'
import  {positionsReducer as positions } from './positions';
import { groupsReducer as groups } from './groups';
import { associationsReducer as associations } from './associations';

const reducer = combineReducers({
  session,
  devices,
  users,
  organizations,
  positions,
  groups,
  associations,
});

export { sessionActions } from './session';
export { devicesActions } from './devices';
export { usersActions } from './users';
export { organizationsActions } from './organizations';
export { positionsActions } from './positions'
export { groupsActions } from './groups'
export { associationsActions } from './associations';

export default configureStore({ reducer });