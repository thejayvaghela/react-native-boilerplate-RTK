import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsService } from '@Services/UserService';

export const fetchPosts = createAsyncThunk(
  'user/posts',
  async () => await fetchPostsService(),
);
