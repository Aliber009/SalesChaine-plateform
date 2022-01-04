import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'associations',
  initialState: {
    children: [],
    parents:[],
  },
  reducers: {
    updateChildren(state, action) {
      state.children=action.payload;
    },
    updateParents(state, action) {
      state.parents=action.payload;
    },
    /* deleteOneParent(state,action){
      var newState=[]
      state.parents=state.parents.filter(item=>item.id!=action.payload.id) 
    }, */
    deleteOneChild(state,action){
      var newState=[]
      state.children=state.children.map(u=>{
        if(u.id==action.payload.associatedId)
        {
          var x=u.Devices.filter(i=>i.id!=action.payload.deviceId);
          u.Devices=x
        }return u
       })
    }
  }
});

export { actions as associationsActions };
export { reducer as associationsReducer };