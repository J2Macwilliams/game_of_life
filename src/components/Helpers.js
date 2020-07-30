import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles(() => ({

    slider: {
		color: '#696969',
		margin: 0,
		
    }
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