import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Board from './components/Board';
import About from './components/About';

import NavBar from './components/NavBar';

import './App.css';

function App() {
	return (
		<div className='App'>
			<NavBar />

			<Switch>
				<Route exact path='/'>
					<Board />
				</Route>

				<Route path='/about'>
					<About />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
