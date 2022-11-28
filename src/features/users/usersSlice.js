import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialUserState = {
	// users: [],
	// error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	try {
		const response = await axios.get(POSTS_URL);
		console.log(response.data);
		return response.data;
	} catch (error) {
		return error.message;
	}
});

const usersSlice = createSlice({
	name: 'users',
	initialState: initialUserState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			console.log(action.payload);
			return action.payload;
		});
	},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
