import React from 'react';
import ReactDOM from 'react-dom/client'; //react v18
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
//import { fetchUsers } from './features/users/usersSlice';
import { extendedApiSlice } from './features/posts/postSlice';
import { extendedUsersApiSlice } from './features/users/usersSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//store.dispatch(fetchUsers());
store.dispatch(extendedUsersApiSlice.endpoints.getUsers.initiate()); //get posts at the upload time
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
);
