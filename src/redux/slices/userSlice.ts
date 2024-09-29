import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../../services/api';

// Define types for user data and state
interface User {
  id: number;
  name: string;
  email: string;
  // Add other user fields as necessary
}

interface UsersResponse {
  data: User[];
  total_pages: number;
}

interface UserState {
  users: User[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

// Thunk to fetch users from API
export const getUsers = createAsyncThunk<UsersResponse, number, { rejectValue: string }>(
  'users/getUsers',
  async (page, { rejectWithValue }) => {
    try {
      const data = await fetchUsers(page);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Initial state
const initialState: UserState = {
  users: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
