import { createSlice } from '@reduxjs/toolkit';

const initialUserState = [
	{ id: '0', name: 'novak' },
	{ id: '1', name: 'rune' },
	{ id: '2', name: 'roger' },
];

const usersSlice = createSlice({
	name: 'users',
	initialState: initialUserState,
	reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
