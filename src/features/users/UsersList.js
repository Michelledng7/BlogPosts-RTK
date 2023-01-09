import { Link } from 'react-router-dom';
import { useGetUsersQuery } from './usersSlice';

const UsersList = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery('getUsers');
	//const users = useSelector(selectAllUsers); favour the RTK useGetUsersQuery hook
	console.log(users);

	let content;
	if (isLoading) {
		content = <p>'Loading'</p>;
	} else if (isSuccess) {
		const renderedUsers = users.ids.map((id) => (
			<li key={id}>
				<Link to={`/users/${id}`}>{users.entities[id].name}</Link>
			</li>
		));

		content = (
			<section>
				<h2>Users</h2>
				<ul>{renderedUsers}</ul>
			</section>
		);
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return content;
};

export default UsersList;
