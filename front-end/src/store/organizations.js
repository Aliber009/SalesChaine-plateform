import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'organizations',
  initialState: {
    items: [],
  },
  reducers: {
    update(state, action) {
      state.items=[];
      action.payload.forEach(element => {
        state.items.push({id:element._id,name:element.name,description:element.description})
      });
      //state.items=action.payload.organizations;
    },
    AddOrUpdateOne(state,action){
      var foundOne=false;
       state.items.map(item=>{
        if(item.id==action.payload.organizationId)
        {
        foundOne=true;
        item.name=action.payload.name;item.description=action.payload.description
        return item;
        }
      })
      if(!foundOne){
        state.items.push({id:action.payload.organizationId,name:action.payload.name,description:action.payload.description})
      } 
    },
    deleteOne(state,action){
      var newState=[]
      console.log("action",action.payload)
      state.items=state.items.filter(item=>item.id!=action.payload.organizationId)
     
      
    }
  }
});

export { actions as organizationsActions };
export { reducer as organizationsReducer };