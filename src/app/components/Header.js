import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='Header'>
			<h1>Blog</h1>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='posts'>Post</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
