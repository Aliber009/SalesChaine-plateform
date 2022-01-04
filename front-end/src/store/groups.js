import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'groups',
  initialState: {
    items: [],
  },
  reducers: {
    update(state, action) {
      state.items=action.payload;
      /* action.payload.forEach(element => {
        state.items.push({id:element.groupeId,name:element.name})
      }); */
      
    },
    AddOrUpdateOne(state,action){
      var newstate=[]
      var foundOne=false;
        state.items.map(item=>{
        if(item.id==action.payload.id)
        {
        foundOne=true;
        /* item.name=action.payload.name;
        item.Devices=action.payload.Devices */
        return item;
        }
      })
      if(!foundOne){
        state.items.push({id:action.payload.id,name:action.payload.name,Devices:action.payload.Devices})
        
      } 
    },
    deleteOne(state,action){
      var newState=[]
      state.items=state.items.filter(item=>item.id!=action.payload.id)
     
      
    }
  }
});

export { actions as groupsActions };
export { reducer as groupsReducer };