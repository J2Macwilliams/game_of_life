import React, { useState, useEffect, useRef, useCallback } from 'react';
import { produce } from 'immer';
import { useForm } from 'react-hook-form';
import { Slider } from '@material-ui/core';
import {pulsar} from './Presets/Pulsar'

import { useStyles, valueText, marks, countPeeps } from './Helpers';

const Game = () => {
	// react-hook-form
	const classes = useStyles();
	const { register, handleSubmit } = useForm();
	// state
	const [numRows, setNumRows] = useState(40);
	const [numCols, setNumCols] = useState(60);
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
	const gridRef = useRef();
	gridRef.current = gridRef;

	const activeRef = useRef(active);
	activeRef.current = active;

	const rowRef = useRef();
	rowRef.current = numRows;

	const columnRef = useRef();
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

	// invoke the board
	useEffect(() => {
		if (adjust === false) {
			return;
		} else {
			scratch();
		}
	}, [adjust, numRows, numCols]);

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
	}, [numRows, numCols]);

	const pulsarGrid = useCallback(() => {
		setGrid(pulsar)
	})

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
					getAriaValueText={valueText}
					marks={marks}
					valueLabelDisplay='auto'
				/>
			</div>

			<h3 className='label'>Choose Board Configuration</h3>
			<div className='top'>
				<div
					className='bar cycle'
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
				<div className='bar generation'>Generation: {cycle}</div>
				<div className='bar size'>
					Grid Size:
					<br /> {numRows}r X {numCols}c
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
					className='input'
					type='range'
					label='row'
					placeholder='rows'
					defaultValue={numRows}
					min='25'
					max='40'
					name='row'
					ref={register}
				/>
				<label className='label'>Colums</label>
				<input
					className='input'
					type='range'
					label='col'
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
					label='color'
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
					border: '5px solid black',
					maxHeight: '60vh',
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

			<div className='presets'>
				
				<div onClick={() => pulsarGrid()}>Pulsar</div>
				<p>presets on 40r60c</p>
			</div>
		</div>
	);
};

export default Game;
