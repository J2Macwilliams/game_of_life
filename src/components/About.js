import React from 'react';
import { Paper, Card, Typography, Grid, makeStyles } from '@material-ui/core';
// import { useStyles } from './Helpers';
export const useStyles = makeStyles(() => ({
	slider: {
		color: '#696969',
		margin: 0,
	},
	about: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	paper: {
		background: '#545453',
		padding: '2%',
		margin: 50,
	},
	content: {
		color: 'white',
	},
	extra1: {
		background: 'black',
		color: 'white',
		border: '1px solid white',
		padding: '2%',
		margin: 5,
	},
	extra2: {
		background: 'black',
		border: '1px solid #f5f1a9',
		color: '#f5f1a9',
		padding: '2%',
		margin: 5,
	},
	anchor1: {
		textDecoration: 'none',
		color: 'lightgrey',
	},
	anchor2: {
		textDecoration: 'none',
		color: '#f5f1a9',
	},

	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		padding: 10,
		margin: 30,
	},
	rItem: {
		margin: 1,
	},
	rule1: {
		background: 'white',
	},
	rule2: {
		background: 'lightgrey',
	},
	rule3: {
		background: '#f5f1a9',
	},
	rule4: {
		background: 'gold',
	},
}));

const About = () => {
	const classes = useStyles();
	return (
		<div className={classes.about}>
			<Paper className={classes.paper}>
				<Typography className={classes.content} variant='h3'>
					Game of Life
				</Typography>
				<Typography className={classes.content} variant='body1'>
					Inspired by the creation of the Turing Machine and the resulting
					Cellular Automata, John Conway created the zero-player cellular
					automaton game in 1970. In theory the games results are as powerful as
					a universal Turing Machine. The game operates on certain principles
					inherent in life. Initially, its dependent on the configuration upon
					which cells will evolve. As it operates, basic rules govern the cells
					lifecycle. These Rules are:
				</Typography>
			</Paper>

			<Grid className={classes.grid} spacing={2}>
				<Grid className={classes.rItem} Item xs={12} sm={6} md={3} lg={2}>
					<Card className={classes.rule1}>
						<Typography className={classes.ruleTitle} variant='h6'>
							Rule 1
						</Typography>
						<Typography className={classes.ruleInfo} variant='body2'>
							Any live cell with fewer than two live neighbours dies, as if by
							underpopulation.
						</Typography>
					</Card>
				</Grid>
				<Grid className={classes.rItem} Item xs={12} sm={6} md={3} lg={2}>
					<Card className={classes.rule2}>
						<Typography className={classes.ruleTitle} variant='h6'>
							Rule 2
						</Typography>
						<Typography className={classes.ruleInfo} variant='body2'>
							Any live cell with two or three live neighbours lives on to the
							next generation.
						</Typography>
					</Card>
				</Grid>
				<Grid className={classes.rItem} Item xs={12} sm={6} md={3} lg={2}>
					<Card className={classes.rule3}>
						<Typography className={classes.ruleTitle} variant='h6'>
							Rule 3
						</Typography>
						<Typography className={classes.ruleInfo} variant='body2'>
							Any live cell with more than three live neighbours dies, as if by
							overpopulation.
						</Typography>
					</Card>
				</Grid>
				<Grid className={classes.rItem} Item xs={12} sm={6} md={3} lg={2}>
					<Card className={classes.rule4}>
						<Typography className={classes.ruleTitle} variant='h6'>
							Rule 4
						</Typography>
						<Typography className={classes.ruleInfo} variant='body2'>
							Any dead cell with exactly three live neighbours becomes a live
							cell, as if by reproduction.
						</Typography>
					</Card>
				</Grid>
			</Grid>
			<Grid spacing={2} className={classes.grid}>
				<Grid xs={12} sm={6} md={6}>
					<Card className={classes.extra1}>
						<Typography className={classes.automaton} variant='h5'>
							<a
								className={classes.anchor1}
								href='https://natureofcode.com/book/chapter-7-cellular-automata/'
							>
								Cellular Automata
							</a>
						</Typography>
						<Typography variant='body1'>
							- are discrete, abstract computational systems. They are defined
							of a finite number of cells, evolving in parallel at timed steps.
							They can compute functions and solve algorithmic problems.
						</Typography>
					</Card>
				</Grid>
				<Grid xs={12} sm={6} md={6}>
					<Card Item className={classes.extra2}>
						<Typography className={classes.turing} variant='h5'>
							<a
								className={classes.anchor2}
								href='https://medium.com/@evinsellin/what-exactly-is-turing-completeness-a08cc36b26e2'
							>
								Turing Complete
							</a>
						</Typography>
						<Typography variant='body1'>
							is named after English Mathematician and computer scientist, Alan
							Turing. It is a system of data-manipulation rules that, when ran,
							is able to recognize or decide other data-manipulation sets.
						</Typography>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default About;
