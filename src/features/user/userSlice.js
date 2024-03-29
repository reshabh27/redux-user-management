import { createSlice} from "@reduxjs/toolkit";

// const getUserFromLocalStorage = () => {
//   return JSON.parse(localStorage.getItem("userIMDB")) || null;
// };

const initialState = {
  loggedUser: null,
  canEdit: false,
  canDelete: false,
  tagVal:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
        const { role } = action.payload;
        // Set canEdit and canDelete based on the user's role
        if (role === "admin") {
          state.canEdit = true;
          state.canDelete = true;
        } else if (role === "editor") {
          state.canEdit = true;
          state.canDelete = false;
        }
        state.loggedUser = action.payload;
    //   localStorage.setItem("userIMDB", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.canEdit = false;
      state.canDelete = false;
      state.loggedUser = null;
    //   localStorage.removeItem("allMovies");
    },
    setTagVal:(state,action) => {
      // console.log("i called for " , action.payload);
        state.tagVal = action.payload;
    },
    removeTagVal:(state) => {
      state.tagVal = [];
    }
  },
});

export const { loginUser, logoutUser, setTagVal, removeTagVal } = userSlice.actions;

export default userSlice.reducer;
