import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'devices',
  initialState: {
    items: [],
    selectedId: null
  },
  reducers: {
    
    update(state, action) {
      state.items=[];
      action.payload.forEach(element => {
        state.items.push({id:element.id,name:element.name,imei:element.imei,organization:element.organization})
      });
      //state.items=action.payload.organizations;
    },
    AddOrUpdateOne(state,action){
      var foundOne=false;
       state.items.map(item=>{
        if(item.id==action.payload.deviceId)
        {
        foundOne=true;
        item.name=action.payload.name;item.imei=action.payload.imei;item.organization=action.payload.organization
        return item;
        }
      })
      if(!foundOne){
        state.items.push({id:action.payload.deviceId,name:action.payload.name,imei:action.payload.imei,organization:action.payload.organization})
      } 
    },
    displayShared(state,action){
       const parents=action.payload
       for(var i=0;i<parents.length;i++){
          parents[i].Devices.forEach(device=>state.items.push({...device,shared:parents[i].email}))
       }
    },
    deleteOne(state,action){
      var newState=[]
      console.log("action",action.payload)
      state.items=state.items.filter(item=>item.id!=action.payload.deviceId)
     
      
    },
    select(state, action) {
      state.selectedId = action.payload.id;
    },
    remove(state, action) {
      delete state.items[action.payload];
    },
  }
});

export { actions as devicesActions };
export { reducer as devicesReducer };