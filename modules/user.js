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
    resetUser: state => {
      state.isLogin = false;
      state.userData = null;
    },
  },
});

export const {getUser, saveUser, resetUser} = user.actions;

export default user.reducer;
