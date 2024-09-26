import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const userSlice =createSlice({
    name :'users',
    initialState : {
        usersList :[],
        editedUsers :{},
    },

    reducers :{
        setUsers :(state, action)=>{
            state.usersList =action.payload;
        },

        editUser :(state,action)=>{
            const {id , updatedUser} = action.payload;
            state.editedUsers[id] = updatedUser;
        }
    }
});

export const {setUsers,editUser} = userSlice.actions;

export const fetchUsers = () => async (dispatch)=>{

    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(setUsers(response.data));

};

export default userSlice.reducer;



