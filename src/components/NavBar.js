import React from 'react'
import {NavLink} from 'react-router-dom'

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
					Game
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
    )
}

export default NavBar
