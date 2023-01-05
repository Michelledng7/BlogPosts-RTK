import {
	//createSlice,
	//createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { apiSlice } from '../api/apiSlice';

//not query api
//const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

//normolized state
const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date), //take the logic out of the component
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => '/posts',
			transformResponse: (responseData) => {
				let min = 1;
				const loadedPosts = responseData.map((post) => {
					if (!post?.date)
						post.date = sub(new Date(), { minutes: min++ }).toISOString();
					if (!post?.reactions)
						post.reactions = {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						};
					return post;
				});
				return postsAdapter.setAll(initialState, loadedPosts);
			},
			providesTags: (result, error, arg) => [
				{ type: 'Posts', id: 'LIST' },
				...result.ids.map((id) => ({ type: 'Posts', id })),
			],
		}),
	}),
});

export const { useGetPostsQuery } = extendedApiSlice;

//return the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();
//creates memoized selector
const selectPostsData = createSelector(
	selectPostsResult,
	(postsResult) => postsResult.data //normalized state object with ids and entities
);

//getSelectors creates below selectors and rename them with preexisting names using destructuring
export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors(
	(state) => selectPostsResult(state) ?? initialState
);
