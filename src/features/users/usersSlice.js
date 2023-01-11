//import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
//import axios from 'axios';

//const POSTS_URL = 'http://localhost:5500/users';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
// 	try {
// 		const response = await axios.get(POSTS_URL);
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		return error.message;
// 	}
// });
//normolized state
export const usersAdapter = createEntityAdapter();
const initialUserState = usersAdapter.getInitialState();

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => '/users',
			transformResponse: (responseData) => {
				return usersAdapter.setAll(initialUserState, responseData);
			},
			providesTags: (result, error, arg) => [
				{ type: 'Users', id: 'LIST' },
				...result.ids.map((id) => ({
					type: 'Users',
					id,
				})),
			],
		}),
	}),
});

export const { useGetUsersQuery } = extendedUsersApiSlice;

//return the query result object
export const selectUsersResult =
	extendedUsersApiSlice.endpoints.getUsers.select();
//create memoized selectors
const selectAllUsersData = createSelector(
	selectUsersResult,
	(responseData) => responseData.data
);

//getSelectors creates below selectors and rename them
export const {
	selectAll: selectAllUsers,
	selectByIds: selectUserById,
	selectIds: selectUserId,
} = usersAdapter.getSelectors(
	(state) => selectAllUsersData(state) ?? initialUserState
);

//export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, id) =>
// 	state.users.find((user) => user.id === Number(id));

//export default usersSlice.reducer;
