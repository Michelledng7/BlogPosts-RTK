import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import Layout from './app/components/Layout';
import { Route, Routes } from 'react-router-dom';
import EditPostForm from './features/posts/EditPostForm';

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
			</Route>
		</Routes>
	);
}

export default App;
