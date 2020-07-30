import React from 'react';
import {
	Paper,
	Card,
	Typography,
	Grid,
	// createMuiTheme,
} from '@material-ui/core';
import { useStyles } from './Helpers';
// import '../App.css';
// const theme = createMuiTheme();
// theme.typography.h3 = {
// 	fontSize: '2rem',
// 	'@media (min-width:600px)': {
// 		fontSize: '1.5rem',
// 	},
// 	[theme.breakpoints.up('md')]: {
// 		fontSize: '2.4rem',
// 	},
// };
// theme.typography.h6 = {
// 	fontSize: '2rem',
// 	'@media (min-width:600px)': {
// 		fontSize: '1.3rem',
// 	},
// 	[theme.breakpoints.up('md')]: {
// 		fontSize: '1.8rem',
// 	},
// };
// theme.typography.body2 = {
// 	fontSize: '1.2rem',
// 	'@media (min-width:600px)': {
// 		fontSize: '1.5rem',
// 	},
// 	[theme.breakpoints.up('md')]: {
// 		fontSize: '2.4rem',
// 	},
// };
const About = () => {
	const classes = useStyles();
	return (
		<div className={classes.about}>
			<Paper className={classes.paper}>
				<Typography className={classes.title} variant='h3'>
					Game of Life
				</Typography>
				<Typography className={classes.content} variant='body1'>
					- is a zero-player cellular automaton game created by John Conway in
					1970. Dependent on the initial configuration, cells will evolve. Basic
					rules govern the cells lifecycle.
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
							Named after English Mathematician and computer scientist. It is a
							system of data-manipulation rules that, when ran, is able to
							recognize or decide other data-manipulation sets.
						</Typography>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default About;
