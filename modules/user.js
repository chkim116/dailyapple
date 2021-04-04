import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  userData: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isUser: (state, {payload}) => {
      state.isLogin = payload;
    },
    saveUser: (state, {payload}) => {
      state.userData = payload;
      state.isLogin = true;
    },
  },
});

export const {getUser, saveUser} = user.actions;

export default user.reducer;
