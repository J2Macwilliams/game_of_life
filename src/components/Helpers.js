import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
	slider: {
		color: '#696969',
		margin: 0,
	},
	about: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black'
	},
	paper: {
		background: '#696969',
		padding: '2%',
		margin: 50,
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
		margin: 30
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

export const countPeeps = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1],
];
