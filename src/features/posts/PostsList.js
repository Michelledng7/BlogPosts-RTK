import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsError, getPostsStatus } from './postSlice';
import PostsExcerpt from './PostsExcerpt';
//import { useEffect } from 'react';

const PostsList = () => {
	const posts = useSelector(selectAllPosts);
	console.log(posts);
	const postsStatus = useSelector(getPostsStatus);
	const postsError = useSelector(getPostsError);
	//const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (postsStatus === 'idle') {
	// 		dispatch(fetchPosts());
	// 	}
	// }, [postsStatus, dispatch]);

	let content;
	if (postsStatus === 'loading') {
		content = <p> "Loading..."</p>;
	} else if (postsStatus === 'succeeded') {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((post) => (
			<PostsExcerpt key={post.id} post={post} />
		));
	} else if (postsStatus === 'failed') {
		content = <p>{postsError}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default PostsList;
