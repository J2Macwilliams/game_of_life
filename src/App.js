import React from 'react';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

import Game from './components/Game';
import About from './components/About';
import NavBar from './components/NavBar';
import './App.css';

function App() {
	return (
		<div className='App'>
			<NavBar />

			<Switch>
				<Route exact path='/'>
					<Game />
				</Route>
				<Route path='/about'>
					<About />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
