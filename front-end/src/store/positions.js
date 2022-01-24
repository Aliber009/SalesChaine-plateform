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
      state.items[id] = {latlng:[parseFloat(action.payload.lat),parseFloat(action.payload.lon)],time:action.payload.gpsTime,attributes:JSON.parse(action.payload.Attributes)};
      //console.log("pos",state.items)
    },
    updateAll(state,action){
      action.payload.forEach(i=>{
        if(i){
        const id=i["deviceId"];
        state.items[id] = {latlng:[parseFloat(i.lat),parseFloat(i.lon)],time:i.gpsTime,attributes:JSON.parse(i.Attributes)};
        }
      })
      
    },
  }
});

export { actions as positionsActions };
export { reducer as positionsReducer };