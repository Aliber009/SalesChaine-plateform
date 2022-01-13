import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'session',
  initialState: {
    success: null,
    userRole: null,
  },
  reducers: {
    updateSession(state, action) {
      state.success = action.payload;
      
    },
    updateUserRole(state, action) {
      
      state.userRole = action.payload;
    },
  },
});

export { actions as sessionActions };
export { reducer as sessionReducer };