import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles(() => ({
	root: {
		width: 300,
    },
    slider: {
        color: 'darkGray'
    }
}));

export function valueText(value) {
    return `${value}`;
  }

  export const marks = [
	{
		value: 1500,
		label: 'very slow',
	},
	{
		value: 1000,
		label: 'slow',
	},
	{
		value: 500,
		label: 'med',
	},
	{
		value: 75,
		label: 'fast',
	},
];


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