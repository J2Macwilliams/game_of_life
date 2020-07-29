import React, { useState, useEffect, useRef, useCallback } from 'react';
import { produce } from 'immer';
import { Slider, Typography } from '@material-ui/core';
import { useStyles, valueText, marks, countPeeps } from './Helpers';

const Game = () => {
	const classes = useStyles();
	// state
	const numRows = 40;
	const numCols = 60;
	const [cycle, setCycle] = useState(0);
	const [speed, setSpeed] = useState(200);
	const [active, setActive] = useState(false);
	const [grid, setGrid] = useState([]);

	const handleChange = (event, newValue) => {
		event.preventDefault();
		setSpeed(newValue);
	};

	// create clean board
	const scratch = useCallback(() => {
		setGrid(() => {
			const rows = [];
			for (let i = 0; i < numRows; i++) {
				rows.push(Array(numCols).fill(0));
			}
			return rows;
		});
	}, []);

	// invoke the board
	useEffect(() => {
		scratch();
	}, []);

	// create references for current state
	const speedRef = useRef(speed);
	speedRef.current = speed;

	const cycleRef = useRef(cycle);
	cycleRef.current = cycle;

	const activeRef = useRef(active);
	activeRef.current = active;

	// Run the Game of Life
	const gameAlive = useCallback(() => {
		if (!activeRef.current) {
			return;
		} else {
			setGrid(g => {
				return produce(g, copy => {
					for (let i = 0; i < numRows; i++) {
						for (let k = 0; k < numCols; k++) {
							let peeps = 0;
							countPeeps.forEach(([x, y]) => {
								const I = i + x;
								const K = k + y;
								if (I >= 0 && I < numRows && K >= 0 && K < numCols) {
									peeps += g[I][K];
								}
							});
							if (peeps < 2 || peeps > 3) {
								copy[i][k] = 0;
							} else if (peeps === 3 && g[i][k] === 0) {
								copy[i][k] = 1;
							}
						}
					}
				});
			});
		}
		setCycle(cycleRef.current += 1)
		setTimeout(gameAlive, speed);
	}, []);

	return (
		<div className='life'>
			{/* Game Grid */}
			<div className={classes.root}>
				<Typography className={classes.slider} variant='h4'>
					Speed
				</Typography>
				<Slider
					className={classes.slider}
					min={0}
					max={1200}
					value={speed}
					defaultValue={speed}
					onChange={handleChange}
					getAriaValueText={valueText}
					marks={marks}
					valueLabelDisplay='auto'
				/>
			</div>
			<div className='top'>
				<div
					className='bar cycle'
					onClick={() => {
						setActive(!active);
						activeRef.current = true;
						gameAlive();
					}}
				>
					{!active ? 'start' : 'stop'}
				</div>

				<div className='bar generation'>Generation: {cycle}</div>
				<div className='bar size'>
					Grid Size: {numCols}x{numRows}
				</div>
				<div className='bar clear' onClick={() => scratch()}>
					Clear
				</div>
			</div>

			<div
				className='game'
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat( ${numCols}, 15px)`,
					border: '5px solid black',
				}}
			>
				{grid.map((rows, i) =>
					rows.map((col, k) => (
						<div
							key={`${i}-${k}`}
							onClick={() => {
								// use immer to create a copy of the grid state
								const nextGen = produce(grid, copy => {
									// toggle cell from alive to dead
									copy[i][k] = grid[i][k] ? 0 : 1;
								});
								setGrid(nextGen);
							}}
							// define and change cells if alive or dead
							style={{
								width: 15,
								height: 15,
								background: grid[i][k] ? 'yellow' : undefined,
								border: ' 1px solid rgba(248, 246, 246, 0.15)',
							}}
						/>
					))
				)}
			</div>
			<div className='game presets'>Presets</div>
		</div>
	);
};

export default Game;

// trying to change the grid
// onClick={() => {
//     const nextGen = [...grid]
//     nextGen[i][k] = 1
//     setGrid(nextGen)
//     console.log(grid)
// }}

// // make a copy of grid
// const nextGen = [...grid]
// console.log('nextGen:', nextGen)
// console.log('truthy?:', nextGen == grid)
