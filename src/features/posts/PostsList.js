import { useSelector } from 'react-redux';
import { selectPostIds, getPostsError, getPostsStatus } from './postSlice';
import PostsExcerpt from './PostsExcerpt';
//import { useEffect } from 'react';

const PostsList = () => {
	const orderedPostsIds = useSelector(selectPostIds);
	//console.log(posts);
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
		content = orderedPostsIds.map((postId) => (
			<PostsExcerpt key={postId} postId={postId} />
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
