import { createSlice } from '@reduxjs/toolkit';

import cookieManager from '../utils/cookieManager';

const cookieSlice = createSlice({
  name: 'cookies',
  initialState: {
    JWTToken: cookieManager('get', 'JWTToken') || null,
  },
  reducers: {
    setCookie: (state, action) => {
      const { name, value, days, path } = action.payload;
      state[name] = cookieManager('set', name, value, days, path);
    },
    getCookie: (state, action) => {
      const { name } = action.payload;
      state[name] = cookieManager('get', name);
    },
    deleteCookie: (state, action) => {
      const { name, path } = action.payload;
      state[name] = cookieManager('delete', name, '', 0, path);
    },
    updateCookie: (state, action) => {
      const { name, value, days, path } = action.payload;
      state[name] = cookieManager('update', name, value, days, path);
    },
  },
});

export const { setCookie, getCookie, deleteCookie, updateCookie } = cookieSlice.actions;

export default cookieSlice.reducer;
