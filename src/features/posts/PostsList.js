import { useSelector } from 'react-redux';
import { selectPostIds } from './postSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from './postSlice';

const PostsList = () => {
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
	const orderedPostsIds = useSelector(selectPostIds);
	//console.log(posts);

	//const dispatch = useDispatch();

	let content;
	if (isLoading) {
		content = <p> "Loading..."</p>;
	} else if (isSuccess) {
		content = orderedPostsIds.map((postId) => (
			<PostsExcerpt key={postId} postId={postId} />
		));
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default PostsList;
