import { useDispatch } from 'react-redux';
import { reactionReducer } from './postSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	wow: '😮',
	heart: '❤️',
	rocket: '🚀',
	coffee: '☕',
}; //key and value pairs

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();
	const emojiButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				className='reactionButton'
				key={name}
				type='button'
				onClick={() =>
					dispatch(reactionReducer({ postId: post.id, reaction: name }))
				}
			>
				{emoji} {post.reactions[name]}
			</button>
		);
	});

	return <div>{emojiButtons}</div>;
};

export default ReactionButtons;
