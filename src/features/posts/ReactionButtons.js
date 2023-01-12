import { useAddReactionMutation } from './postSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	wow: '😮',
	heart: '❤️',
	rocket: '🚀',
	coffee: '☕',
}; //key and value pairs

const ReactionButtons = ({ post }) => {
	//const dispatch = useDispatch();
	const [addReaction] = useAddReactionMutation();
	const emojiButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				className='reactionButton'
				key={name}
				type='button'
				// onClick={() =>
				// 	//dispatch(reactionReducer({ postId: post.id, reaction: name }))
				// }
				onClick={() => {
					const newValue = post.reactions[name] + 1;
					addReaction({
						postId: post.id,
						reactions: { ...post.reactions, [name]: newValue },
					});
				}}
			>
				{emoji} {post.reactions[name]}
			</button>
		);
	});

	return <div>{emojiButtons}</div>;
};

export default ReactionButtons;
