import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
	//console.log(post);
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
