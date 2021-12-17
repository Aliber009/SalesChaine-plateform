import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'session',
  initialState: {
    success: null,
    user: null,
  },
  reducers: {
    updateSession(state, action) {
      state.success = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export { actions as sessionActions };
export { reducer as sessionReducer };