import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/nav.css'

const NavBar = () => {
	return (
		<div>
			<nav className='navbar'>
           
				<NavLink
					exact
					to='/'
					activeClassName='activeNavButton'
					className='NLink'
				>
					Game of Life
				</NavLink>
				<h1>Conway's </h1>
				<NavLink
					to='/about'
					activeClassName='activeNavButton'
					className='NLink'
				>
					About
				</NavLink>
			</nav>
		</div>
	);
};

export default NavBar;
