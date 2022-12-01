import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import { Link, useParams } from 'react-router-dom';
import { selectAllPosts } from '../posts/postSlice';

const UserPage = () => {
	const { userId } = useParams();
	const user = useSelector((state) => selectUserById(state, Number(userId))); //id from url parse to number
	console.log(user);
	const postsOfUser = useSelector(selectAllPosts).filter(
		(post) => Number(post.userId) === Number(userId)
	);
	console.log(postsOfUser);
	const postTitle = postsOfUser.map((post) => (
		<li key={post.id}>
			<Link to={`/posts/${post.id}`}>{post.title}</Link>
		</li>
	));

	return (
		<section>
			<h2>{user?.name}</h2>

			<ol>{postTitle}</ol>
		</section>
	);
};

export default UserPage;
