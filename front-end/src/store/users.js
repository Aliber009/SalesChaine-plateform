import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'users',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      state.items=[];
      action.payload.forEach(element => {
        state.items.push({id:element._id,name:element.name,email:element.email,role:element.role,company:element.company,accountConfirmation:element.accountConfirmation})
      });
    },
    AddOrUpdateOne(state,action){
      var foundOne=false;
       state.items.map(item=>{
        if(item.id==action.payload.userId)
        {
        foundOne=true;
        item.name=action.payload.name;item.password=action.payload.password;item.email=action.payload.email;item.role=action.payload.role;item.company=action.payload.company;item.accountConfirmation=action.payload.accountConfirmation
        return item;
        }
      })
      if(!foundOne){
        state.items.push({id:action.payload.userId,name:action.payload.name,password:action.payload.password,email:action.payload.email,role:action.payload.role,company:action.payload.company,accountConfirmation:action.payload.accountConfirmation})
      } 
    },
    deleteOne(state,action){
      var newState=[]
      console.log("action",action.payload)
      state.items=state.items.filter(item=>item.id!=action.payload.userID)
     
      
    },
  }
});

export { actions as usersActions };
export { reducer as usersReducer };