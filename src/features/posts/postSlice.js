import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const initialState = [
	{
		id: '1',
		title: 'Blog posts 1',
		content: 'Tennis is good exercise',
	},
	{
		id: '2',
		title: 'Blog posts 2',
		content: 'Tennis needs a lot of practice',
	},
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
					},
				};
			},
		},
	},
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
