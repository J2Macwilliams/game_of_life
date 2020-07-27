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

			<NavLink to='/'>Game</NavLink>

			<NavLink to='/about'>About</NavLink>
		</div>
	);
}

export default App;
