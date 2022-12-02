import { selectAllUsers } from '../users/usersSlice';
import { useSelector } from 'react-redux';

const PostAuthor = ({ userId }) => {
	const users = useSelector(selectAllUsers);
	console.log(users);
	const author = users.find((user) => user.id === userId);
	return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
