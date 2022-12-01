import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import Layout from './app/components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import EditPostForm from './features/posts/EditPostForm';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<PostsList />} />
				<Route path='posts'>
					<Route index element={<AddPostForm />} />
					<Route path=':postId' element={<SinglePostPage />} />
					<Route path='edit/:postId' element={<EditPostForm />} />
				</Route>
				<Route path='users'>
					<Route index element={<UsersList />} />
					<Route path=':userId' element={<UserPage />} />
				</Route>

				<Route path='*' element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	);
}

export default App;
