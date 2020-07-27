import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Game from './components/Game';
import About from './components/About';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/'>
					<Game />
				</Route>
				<Route path='/about'>
					<About />
				</Route>
			</Switch>
      <nav className='navbar'>
			<NavLink exact to='/'  activeClassName='activeNavButton' className='NLink'>
				Game
			</NavLink>

			<NavLink to='/about'  activeClassName='activeNavButton' className='NLink'>
				About
			</NavLink>
      </nav>
		</div>
	);
}

export default App;
