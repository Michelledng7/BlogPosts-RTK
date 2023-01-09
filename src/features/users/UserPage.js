import { Link, useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../posts/postSlice';
import { useGetUsersQuery } from './usersSlice';

const UserPage = () => {
	const { userId } = useParams();

	const {
		user,
		isLoading: isLoadingUsers,
		isSuccess: isSuccessUsers,
		isError: isErrorUsers,
		error: errorUsers,
	} = useGetUsersQuery('getUsers', {
		selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
			user: data?.entities[userId],
			isLoading,
			isSuccess,
			isError,
			error,
		}),
	});
	console.log(user);

	const {
		data: postsOfUser,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useGetPostsByUserIdQuery(Number(userId));
	console.log(postsOfUser);

	let content;
	if (isLoading) {
		content = <p>Loading</p>;
	} else if (isSuccess) {
		content = postsOfUser.ids.map((id) => (
			<li key={id}>
				<Link to={`/posts/${id}`}>{postsOfUser.entities[id].title}</Link>
			</li>
		));
	} else if (isError) {
		content = <p>{error}</p>;
	}
	//Removes all instances of the Redux useSelector in favor of RTK useQuery hooks
	// const postsOfUser = useSelector(selectAllPosts).filter(
	// 	(post) => Number(post.userId) === Number(userId)
	// );

	//apply the memoized selector
	// const postsOfUser = useSelector((state) =>
	// 	selectPostsByUser(state, Number(userId))
	// );
	//console.log(postsOfUser);
	// const postTitles = postsOfUser.map((post) => (
	// 	<li key={post.id}>
	// 		<Link to={`/posts/${post.id}`}>{post.title}</Link>
	// 	</li>
	// ));
	return (
		<section>
			<h2>Posts by {user.name}</h2>
			{content}
		</section>
	);
};

export default UserPage;
