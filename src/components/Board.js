import React, { useState } from 'react';

const Game = () => {
	const [numRows, setNumRows] = useState(40);
	const [numCols, setNumCols] = useState(60);
	const [active, setActive] = useState();
	const [cycle, setCycle] = useState(0);

	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < numRows; i++) {
			rows.push(Array.from(Array(numCols), () => 0));
		}
		return rows;
	});

	const running = () => {
		setActive(!active);
	};
	return (
		<div className='life'>
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
							onClick={() => setGrid[i][k] == 1}
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
			<div className='right'>
				
					<button className='cycle' onClick={() => running()}>
						{!active ? 'start' : 'stop'}
					</button>
					<div className='bar generation'>Generation: {cycle}</div>
                    <div className='bar size'>Grid Size: {numCols}x{numRows}</div>
                    <div className='bar presets'>Presets</div>
					
						
					
				
			</div>
		</div>
	);
};

export default Game;
