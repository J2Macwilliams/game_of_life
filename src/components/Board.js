import React, { useState, useEffect, useRef, useCallback } from 'react';
import { produce } from 'immer';
import { useForm } from 'react-hook-form';
import { Slider } from '@material-ui/core';
// presets
import { pulsar } from './Presets/Pulsar';
import { pentadecathlon } from './Presets/Pentadecathlon';
import { spaceships } from './Presets/Space';
import { gliderGun } from './Presets/GGun';
// small presets
import { smallPulsar } from './SmallPresets/Pulsar';
import { smallPenta } from './SmallPresets/Penta';
import { smallSpaceShips } from './SmallPresets/Spaceship';

import { useStyles, countPeeps } from './Helpers';
import '../Styles/board.css';

const Game = () => {
	// react-hook-form
	const classes = useStyles();
	const { register, handleSubmit } = useForm();
	// state
	const [numRows, setNumRows] = useState(25);
	const [numCols, setNumCols] = useState(25);
	const [speed, setSpeed] = useState(100);
	const [color, setColor] = useState('white');
	const [adjust, setAdjust] = useState(false);
	const [active, setActive] = useState(false);
	const [grid, setGrid] = useState([]);
	const [cycle, setCycle] = useState(0);

	// data from form
	const onSubmit = data => {
		setNumRows(parseInt(data.row));
		setNumCols(parseInt(data.col));
		setColor(data.color);
		setAdjust(true);
	};

	// create references for current state
	const activeRef = useRef(active);
	activeRef.current = active;

	const rowRef = useRef(numRows);
	rowRef.current = numRows;

	const columnRef = useRef(numCols);
	columnRef.current = numCols;

	const speedRef = useRef(speed);
	speedRef.current = speed;

	const cycleRef = useRef(cycle);
	cycleRef.current = cycle;

	// for changing the speed of the dbl buffer
	const handleChange = (event, newValue) => {
		event.preventDefault();
		setSpeed(newValue);
	};

	// create clean board
	const scratch = useCallback(() => {
		setGrid(() => {
			const rows = [];
			for (let i = 0; i < rowRef.current; i++) {
				rows.push(Array(columnRef.current).fill(0));
			}
			return rows;
		});
	}, []);

	// invoke the board initial and with changes 
	useEffect(() => {
		scratch()
		if (adjust === false) {
			return;
		} else {
			scratch();
		}
		
	}, [adjust, numRows, numCols, scratch]);

	// create Random config
	const randomGrid = useCallback(() => {
		setGrid(() => {
			const rows = [];
			for (let i = 0; i < rowRef.current; i++) {
				rows.push(
					Array.from(Array(columnRef.current), () => Math.round(Math.random()))
				);
			}
			return rows;
		});
	}, []);

	// preset grids
	const pulsarGrid = useCallback(() => {
		setNumCols(60);
		setNumRows(40);
		setGrid(pulsar);
	}, []);

	const pentadecathlonGrid = useCallback(() => {
		setNumCols(60);
		setNumRows(40);
		setGrid(pentadecathlon);
	}, []);

	const spaceGrid = useCallback(() => {
		setNumCols(60);
		setNumRows(40);
		setGrid(spaceships);
	}, []);

	const gliderGunGrid = useCallback(() => {
		setNumCols(60);
		setNumRows(40);
		setGrid(gliderGun);
	}, []);

	// Run the Game of Life, DBl Buffer
	const runAlive = useCallback(() => {
		// check/return if not running
		if (!activeRef.current) {
			return;
		} else {
			// create automata
			setGrid(g => {
				return produce(g, gCopy => {
					for (let i = 0; i < rowRef.current; i++) {
						for (let k = 0; k < columnRef.current; k++) {
							let peeps = 0;
							countPeeps.forEach(([x, y]) => {
								const I = i + x;
								const K = k + y;
								if (
									I >= 0 &&
									I < rowRef.current &&
									K >= 0 &&
									K < columnRef.current
								) {
									peeps += g[I][K];
								}
							});

							if (peeps < 2 || peeps > 3) {
								gCopy[i][k] = 0;
							} else if (g[i][k] === 0 && peeps === 3) {
								gCopy[i][k] = 1;
							}
						}
					}
				});
			});
		}
		// increment generation count
		setCycle(cycleRef.current + 1);
		setTimeout(runAlive, speedRef.current);
	}, []);

	return (
		<div className='life'>
			<div className='slider'>
				<h3 className='tag'>Speed</h3>
				<Slider
					className={classes.slider}
					min={0}
					max={1200}
					value={speedRef.current}
					defaultValue={speedRef.current}
					onChange={handleChange}
					valueLabelDisplay='auto'
				/>
			</div>
			<p>Configure Game</p>
			<div className='top'>
				<div
					className={!active ? 'bar cycle' : 'bar progress'}
					onClick={() => {
						setActive(!active);
						activeRef.current = true;
						runAlive();
					}}
				>
					{!active ? 'start' : 'stop'}
				</div>
				<div className='bar random' onClick={() => randomGrid()}>
					Random
				</div>
				<div className='bar generation'>Cycle: {cycle}</div>
				<div className='bar size'>
					{numRows}r x {numCols}c
				</div>
				<div
					className='bar clear'
					onClick={() => {
						setAdjust(false);
						scratch();
						setCycle(0);
					}}
				>
					Clear
				</div>
			</div>
			<form className='form' onSubmit={handleSubmit(onSubmit)}>
				<label className='label'>Rows</label>
				<input
					className='input1'
					type='range'
					placeholder='rows'
					defaultValue={numRows}
					min='25'
					max='40'
					name='row'
					ref={register}
				/>
				<label className='label'>Columns</label>
				<input
					className='input1'
					type='range'
					placeholder='columns'
					defaultValue={numCols}
					min='25'
					max='60'
					name='col'
					ref={register}
				/>
				<input
					className='input'
					type='text'
					placeholder={color}
					defaultValue={color}
					name='color'
					ref={register}
				/>
				<input className='submit' type='submit' />
			</form>
			{/* Game Grid */}
			<div
				className='game'
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat( ${numCols}, 15px)`,
				}}
			>
				{grid.map((rows, i) =>
					rows.map((col, k) => (
						<div
							key={`${i}-${k}`}
							onClick={() => {
								// use immer to create a copy of the grid state
								const nextGen = produce(grid, gridCopy => {
									// toggle cell from alive to dead
									gridCopy[i][k] = grid[i][k] ? 0 : 1;
								});
								setGrid(nextGen);
							}}
							// define and change cells if alive or dead
							style={{
								width: 15,
								height: 15,
								background: grid[i][k] ? color : undefined,
								border: ' 1px solid rgba(248, 246, 246, 0.15)',
							}}
						/>
					))
				)}
			</div>
			<footer className='footer'>
				<h6>Presets:</h6>
				<div onClick={() => pulsarGrid()}>Pulsar</div>
				<div onClick={() => pentadecathlonGrid()}>Pentadecathlon</div>
				<div onClick={() => spaceGrid()}>Spaceships</div>
				<div onClick={() => gliderGunGrid()}>GliderGun</div>
			</footer>
			<footer className='footerSmall'>
				<h6>Presets:</h6>
				<div onClick={() => setGrid(smallPulsar)}>Pulsar</div>
				<div onClick={() => setGrid(smallPenta)}>Pentadecathlon</div>
				<div onClick={() => setGrid(smallSpaceShips)}>Spaceships</div>
			</footer>
		</div>
	);
};

export default Game;
