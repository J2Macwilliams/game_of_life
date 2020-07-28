import React, { useState, useEffect, useRef, useCallback } from 'react';
import { produce } from 'immer';

let countPeeps = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1],
];

const Game = () => {
	// state
	const numRows = 40;
    const numCols = 60;
    const cycle = 0;
	const [clear, setClear] = useState(false);
	const [active, setActive] = useState(false);
	
    
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < numRows; i++) {
			rows.push(Array(numCols).fill(0));
		}
		return rows;
	});

    // Clear the Board
    const scratch = useCallback(() => {
       setGrid(() => {
        const rows = [];
		for (let i = 0; i < numRows; i++) {
			rows.push(Array(numCols).fill(0));
		}
		return rows;
       })
        
    },[])
    
	// create a reference for active state
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
		setTimeout(gameAlive, 1000);
	}, []);

	return (
		<div className='life'>
			{/* Game Grid */}
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
			{/* dashboard */}
			<div className='right'>
				<button
					className='bar cycle'
					onClick={() => {
						setActive(!active);
						activeRef.current = true;
						gameAlive();
					}}
				>
					{!active ? 'start' : 'stop'}
				</button>
				<button className='bar clear' onClick={() => scratch()}>
					Clear
				</button>
				<div className='bar generation'>Generation: {cycle}</div>
				<div className='bar size'>
					Grid Size: {numCols}x{numRows}
				</div>
				<div className='bar presets'>Presets</div>
			</div>
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
