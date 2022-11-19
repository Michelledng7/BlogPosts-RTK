import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

import ReactionButtons from './ReactionButtons';

const PostsList = () => {
	const posts = useSelector(selectAllPosts);
	const dispatch = useDispatch();

	const orderedPosts = posts
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date));

	const listPosts = orderedPosts.map((post) => (
		<article key={post.id}>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			<p>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
				<ReactionButtons post={post} />
			</p>
		</article>
	));

	return <div>{listPosts}</div>;
};

export default PostsList;
