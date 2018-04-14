import React, { PureComponent } from 'react';
import _ from 'lodash';

import { getScalePositionsOnFretboard } from './scales';


export default class Fretboards extends PureComponent {

	render() {
		const strings = 6;
		const frets = 24;

		const displayedNotes = getScalePositionsOnFretboard(this.props.scale, this.props.rootNote);

		return (
			<div style={styles.fretboard}>
				{_.range(1, strings + 1).map(string => (
					<div key={string} style={styles.string}>
						{_.range(frets).map(fret => (
							<div
								key={fret}
								style={{
									...styles.fret,
									...(string === strings - 1 && styles.secondLowestStringFret),
									...(string === strings && styles.lowestStringFret),
									...(fret === frets - 2 && string !== strings && styles.secondHighestFret),
									...(fret === frets - 1 && styles.highestFret),
								}}
							>
								{displayedNotes[string] && displayedNotes[string][fret] &&
									<div style={styles.noteMarker} />
								}
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
