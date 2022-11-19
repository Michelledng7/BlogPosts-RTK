import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';

const PostsList = () => {
	const posts = useSelector(selectAllPosts);

	const listPosts = posts.map((post) => (
		<article key={post.id}>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			<p>
				<PostAuthor userId={post.userId} />
			</p>
		</article>
	));

	return <div>{listPosts}</div>;
};

export default PostsList;
