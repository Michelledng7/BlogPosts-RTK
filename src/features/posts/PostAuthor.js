import { selectAllUsers } from '../users/usersSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostAuthor = ({ userId }) => {
	const users = useSelector(selectAllUsers);
	console.log(users);
	const author = users.find((user) => user.id === userId);
	console.log(author);
	return (
		<span>
			by{' '}
			{author ? (
				<Link to={`/user/${userId}`}>{author.name}</Link>
			) : (
				'Unknown author'
			)}
		</span>
	);
};

export default PostAuthor;
