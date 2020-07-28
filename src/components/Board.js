import React, { useState, useCallback } from 'react';
import { produce } from 'immer';

const Game = () => {
	const numRows = 10;
	const numCols = 10;
	const [active, setActive] = useState(false);
	const [cycle, setCycle] = useState(0);

	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < numRows; i++) {
			rows.push(Array(numCols).fill(0));
		}
		return rows;
	});
	
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
							style={{
								width: 15,
								height: 15,
								background: grid[i][k] ? 'yellow' : undefined,
								border: ' 1px solid rgba(248, 246, 246, 0.4)',
							}}
						/>
					))
				)}
			</div>
			{/* dashboard */}
			<div className='right'>
				<button className='cycle' onClick={() => setActive(!active)}>
					{!active ? 'start' : 'stop'}
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
