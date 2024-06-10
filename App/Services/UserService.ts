import axios from 'axios';
import { ApiConfig } from '@ApiConfig';
import { getItemFromStorage } from '@Utils/Storage';
import { Authentication } from '@Utils/Enums';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const isLoggedIn = () => {
  const token = getItemFromStorage(Authentication.TOKEN);
  if (!token) {
    return false;
  }
  ApiConfig.token = token;
  return true;
};

export const userLogin = async (params: any) => {
  const response = await axios.post(ApiConfig.login, params);
  return response.data;
};

export const fetchPostsService = async () => {
  const response = await axios.get(ApiConfig.posts);
  return response.data;
};
