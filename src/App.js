import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import Layout from './app/components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<main>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<PostsList />} />
					<Route path='post'>
						<Route index element={<AddPostForm />} />
						<Route path=':postId' element={<SinglePostPage />} />
					</Route>
				</Route>
			</Routes>
		</main>
	);
}

export default App;
