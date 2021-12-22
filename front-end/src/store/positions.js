import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'positions',
  initialState: {
    items: [],
  },
  reducers: {
    update(state, action) {
      //state.items.push({action.payload['deviceId']:action.pay})
      state.items[action.payload['deviceId']] = action.payload;
      console.log("pos",action.payload)
    },
  }
});

export { actions as positionsActions };
export { reducer as positionsReducer };