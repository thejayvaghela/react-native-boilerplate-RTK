import { createSlice } from '@reduxjs/toolkit';
import UserDefault from '@Default/UserDefault';
import { fetchPosts } from '@Thunks/UserThunks';
import { APIStatus, Slices } from '@Utils/Enums';

const UserSlice = createSlice({
  name: Slices.USER,
  initialState: UserDefault,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    userLogout() {
      return UserDefault;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = APIStatus.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = APIStatus.SUCCEEDED;
        state.posts = action.payload || [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = APIStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setUser, userLogout } = UserSlice.actions;
export const userSlice = UserSlice.reducer;
