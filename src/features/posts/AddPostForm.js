import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewPostMutation } from './postSlice';

//import { addNewPost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
	const navigate = useNavigate();
	const [addNewPost, { isLoading }] = useAddNewPostMutation();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');
	//const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const users = useSelector(selectAllUsers);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onUserChanged = (e) => setUserId(e.target.value);

	const cansave = [title, content, userId].every(Boolean) && !isLoading;

	const onSavePostClicked = async () => {
		if (cansave) {
			try {
				//setAddRequestStatus('pending');
				await addNewPost({ title, body: content, userId }).unwrap();
				setTitle('');
				setContent('');
				setUserId('');
				navigate('/');
			} catch (error) {
				console.error('Failed to save the post: ', error);
			}
		}
	};

	return (
		<section>
			<h2>Add a New Post</h2>
			<form>
				<label htmlFor='postTitle'>Post Title:</label>
				<input
					type='text'
					id='postTitle'
					name='postTitle'
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor='postAuthor'>Author:</label>
				<select id='postAuthor' value={userId} onChange={onUserChanged}>
					<option value=''>- Select an author -</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>

				<label htmlFor='postContent'>Content:</label>
				<textarea
					id='postContent'
					name='postContent'
					value={content}
					onChange={onContentChanged}
				/>
				<button type='button' disabled={!cansave} onClick={onSavePostClicked}>
					Save Post
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;
