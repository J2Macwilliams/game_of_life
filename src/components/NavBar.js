import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<div>
			<nav className='navbar'>
            <NavLink
					to='/rules'
					activeClassName='activeNavButton'
					className='NLink'
				>
					Conway's Rules
				</NavLink>
				<NavLink
					exact
					to='/'
					activeClassName='activeNavButton'
					className='NLink'
				>
					Game of Life
				</NavLink>
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
