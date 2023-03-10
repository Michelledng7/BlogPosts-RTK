import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdatePostMutation, useDeletePostMutation } from './postSlice';

import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const post = useSelector((state) => selectPostById(state, Number(postId)));
	const users = useSelector(selectAllUsers);
	console.log(users);

	const [updatePost, { isLoading, isError, error }] = useUpdatePostMutation();
	const [deletePost] = useDeletePostMutation();
	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.body);
	const [userId, setUserId] = useState(post?.userId);
	//const [requestStatus, setRequestStatus] = useState('idle');

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);
	const onAuthorChanged = (e) => setUserId(Number(e.target.value));

	const canSave = [title, content, userId].every(Boolean) && !isLoading;

	const onSavePostClicked = async () => {
		if (canSave) {
			try {
				await updatePost({
					id: Number(postId),
					title,
					body: content,
					userId,
					reactions: post.reactions,
				}).unwrap();
				setTitle('');
				setContent('');
				setUserId('');
				navigate(`/posts/${postId}`);
			} catch (error) {
				console.error('Failed to update post: ', error);
			}
		}
	};

	const onDeletePostClicked = async () => {
		try {
			await deletePost({ id: postId }).unwrap();
			setTitle('');
			setContent('');
			setUserId('');
			navigate('/');
		} catch (error) {
			console.error('Failed to delete post: ', error);
		}
	};

	return (
		<section>
			<h2>Edit Post</h2>
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
				<select
					id='postAuthor'
					defaultvalue={userId}
					onChange={onAuthorChanged}
				>
					<option value=''>-Select Author-</option>
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
				<button type='button' onClick={onSavePostClicked} disabled={!canSave}>
					Save Changes
				</button>

				<button type='button' onClick={onDeletePostClicked}>
					Delete Post
				</button>
			</form>
		</section>
	);
};

export default EditPostForm;
