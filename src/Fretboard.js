import React, { PureComponent } from 'react';
import _ from 'lodash';

import { getScalePositionsOnFretboard } from './scales';


export default class Fretboards extends PureComponent {

    render() {
        const numberOfStrings = Object.keys(this.props.tuning.configuration).length;
        const numberOfFrets = 24;

        const markerDotFrets = [
            3,
            5,
            7,
            9,
            12,
            15,
            17,
            19,
            21,
            24,
        ];

        const displayedNotes = getScalePositionsOnFretboard(
            this.props.scale,
            this.props.rootNote,
            this.props.tuning.configuration,
            numberOfFrets,
            this.props.mode,
        );

        return (
            <div
                style={{
                    ...styles.fretboard,
                    ...this.props.style,
                }}
            >
                {markerDotFrets.map(markerFret => {
                    const top = `${fretHeight * (numberOfStrings - 1) / 2 - markerDiameter / 2}rem`;
                    const left = `${(markerFret - 1) * fretWidth + (fretWidth - markerDiameter) / 2}rem`;

                    if (markerFret % 12 !== 0) {
                        return (
                            <div
                                key={markerFret}
                                style={{
                                    ...styles.markerDot,
                                    top,
                                    left,
                                }}
                            />
                        );
                    }
                    else {
                        return (
                            <div
                                key={markerFret}
                                style={{
                                    ...styles.doubleMarkerDot,
                                    top,
                                    left,
                                }}
                            >
                                <div
                                    style={{
                                        ...styles.markerDot,
                                        top: `${-fretHeight}rem`,
                                    }}
                                />
                                <div
                                    style={{
                                        ...styles.markerDot,
                                        top: `${fretHeight}rem`,
                                    }}
                                />
                            </div>
                        );
                    }
                })}
                {_.range(1, numberOfStrings + 1).map(string => (
                    <div key={string} style={styles.string}>
                        {_.range(numberOfFrets + 1).map(fret => (
                            // If we just use fret number as the key, React will mess up the styles when switching tunings.
                            // Therefore, we also add the tuning ID so that React generates new components when switching.
                            <div
                                key={`${this.props.tuning.id}.${fret}`}
                                style={{
                                    ...styles.fret,

                                    // Frets on the second lowest string
                                    ...(string === numberOfStrings - 1 && styles.secondLowestStringFret),

                                    // Frets on the lowest string
                                    ...(string === numberOfStrings && styles.lowestStringFret),

                                    // Second highest frets on all but the lowest string
                                    ...(fret === numberOfFrets - 1 && string !== numberOfStrings && styles.secondHighestFret),

                                    // Highest frets
                                    ...(fret === numberOfFrets && styles.highestFret),
                                }}
                            >
                                {displayedNotes[string] && displayedNotes[string][fret] &&
                                    <div
                                        style={{
                                            ...styles.noteMarker,
                                            ...(displayedNotes[string][fret].isHighlighted && { backgroundColor: 'red' }),
                                        }}
                                    />
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

}

const fretWidth = 3;
const fretHeight = 2;

const markerDiameter = 1.5;

const styles = {
    fretboard: {
        position: 'relative',

        display: 'flex',
        flexDirection: 'column',
    },
    markerDot: {
        position: 'absolute',

        width: `${markerDiameter}rem`,
        height: `${markerDiameter}rem`,

        backgroundColor: 'gray',
        borderRadius: '100%',
    },
    doubleMarkerDot: {
        position: 'absolute',
    },
    string: {
        display: 'flex',
    },
    fret: {
        position: 'relative',

        boxSizing: 'border-box',

        width: `${fretWidth}rem`,
        height: `${fretHeight}rem`,

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

        top: `${-markerDiameter / 2}rem`,
        left: `${-fretWidth / 2 - markerDiameter / 2}rem`,

        width: `${markerDiameter}rem`,
        height: `${markerDiameter}rem`,

        backgroundColor: 'lightgrey',
        borderRadius: '100%',
    },
};
