import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'positions',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      //state.items.push({action.payload['deviceId']:action.pay})
      const id=action.payload["deviceId"]
      state.items[id] = [parseFloat(action.payload.lat),parseFloat(action.payload.lon)];
      //console.log("pos",state.items)
    },
  }
});

export { actions as positionsActions };
export { reducer as positionsReducer };