import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';

//passed in postId not post for performance optimization
const PostsExcerpt = ({ postId }) => {
	const post = useSelector((state) => selectPostById(state, postId));
	const state = useSelector((state) => state);
	console.log(state);
	console.log(post);
	return (
		<article>
			<h3>{post.title}</h3>
			<p className='excerpt'>{post.body.substring(0, 70)}...</p>
			<p className='postCredit'>
				<p>
					<Link to={`posts/${post.id}`}>View Post </Link>
				</p>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};

export default PostsExcerpt;
