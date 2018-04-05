import React, { PureComponent } from 'react';
import _ from 'lodash';


export default class Fretboards extends PureComponent {

	render() {
		const strings = 6;
		const frets = 24;

		return (
			<div style={styles.fretboard}>
				{_.range(strings).map(string => (
					<div key={string} style={styles.string}>
						{_.range(frets).map(fret => (
							<div
								style={{
									...styles.fret,
									...(string === strings - 2 && styles.secondLowestStringFret),
									...(string === strings - 1 && styles.lowestStringFret),
									...(fret === frets - 2 && string !== strings - 1 && styles.secondHighestFret),
									...(fret === frets - 1 && styles.highestFret),
								}}
							>
								<div style={styles.noteMarker} />
							</div>
						))}
					</div>
				))}
			</div>
		);
	}

}

const styles = {
	fretboard: {
		display: 'flex',
		flexDirection: 'column',
	},
	string: {
		display: 'flex',
	},
	fret: {
		position: 'relative',

		width: '3rem',
		height: '2rem',

		borderTopStyle: 'solid',
		borderLeftStyle: 'solid',
		borderColor: 'black',
		borderWidth: 1,
	},
	secondLowestStringFret: {
		borderBottomStyle: 'solid',
	},
	lowestStringFret: {
		borderTopStyle: 'none',
		borderLeftStyle: 'solid',
		borderLeftColor: 'rgba(0, 0, 0, 0)',
	},
	secondHighestFret: {
		borderRightStyle: 'solid',
	},
	highestFret: {
		borderStyle: 'none',
	},
	noteMarker: {
		position: 'absolute',

		top: '-0.75rem',
		left: '-2.25rem',

		width: '1.5rem',
		height: '1.5rem',

		backgroundColor: 'red',
		borderRadius: '100%',
	},
};
