import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';

// const numRows = 50;
// const numCols = 50;

const Game = () => {
	
	const [numRows, setNumRows] = useState(25);
	const [numCols, setNumCols] = useState(50);

    
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < numRows; i++) {
			rows.push(Array.from(Array(numCols), () => 0));
		}
		return rows;
	});
    console.log(grid)
	

	return (
		<div className='life'>
			<h1>
				Conway's
				<br />
				Game of Life
			</h1>
			
			
				<div
                className='game'
					style={{
						display: 'grid',
                        gridTemplateColumns: `repeat( ${numCols}, 20px)`,
                        border: '5px solid black'
					}}
				>
                    
					{grid.map((rows, i) =>
						rows.map((col, k) => (
							<div
								key={`${i}-${k}`}
								style={{
									width: 20,
									height: 20,
									background: grid[i][k] ? 'yellow' : undefined,
									border: ' 1px solid rgba(248, 246, 246, 0.4)',
								}}
							/>
						))
					)}
				</div>
			
		</div>
	);
};

export default Game;
