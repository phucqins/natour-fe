import { configureStore, createSlice } from "@reduxjs/toolkit";

const retrieveStoredSession = () => {
  const storedSession = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
  };
  return storedSession;
};

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: !!retrieveStoredSession().token,
    user: retrieveStoredSession().user,
    token: retrieveStoredSession().token,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = !!action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;

export default store;
