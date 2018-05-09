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

        const {
            positions: displayedNotes,
            lowestFret,
            highestFret,
        } = getScalePositionsOnFretboard({
            scaleId: this.props.scale,
            rootNote: this.props.rootNote,
            stringConfiguration: this.props.tuning.configuration,
            numberOfFrets: numberOfFrets,
            mode: this.props.mode,
            chord: this.props.chord,
            showAllScaleNotes: this.props.showAllScaleNotes,
            positionStart: this.props.positionStart,
            positionEnd: this.props.positionEnd,
        });

        const lowestDisplayedFret = (this.props.matchDisplayedFretsToPosition && lowestFret - 1 > 0) ? lowestFret - 1 : 0;
        const highestDisplayedFret = (this.props.matchDisplayedFretsToPosition && highestFret + 1 < numberOfFrets) ? highestFret + 1 : numberOfFrets;

        return (
            <div style={styles.fretboardRow}>
                <div
                    style={{
                        ...styles.fretboard,
                        ...this.props.style,
                    }}
                >
                    {markerDotFrets.map(markerFret => {
                        if (markerFret < lowestDisplayedFret || markerFret > highestDisplayedFret) {
                            return null;
                        }

                        const top = `${fretHeight * (numberOfStrings - 1) / 2 - markerDiameter / 2}rem`;
                        const left = `${(markerFret - lowestDisplayedFret) * fretWidth + (fretWidth - markerDiameter) / 2}rem`;

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
                            {_.range(lowestDisplayedFret, highestDisplayedFret + 1).map(fret => (
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

                                        // Fret number zero, i.e. the open string, and string is not the highest
                                        ...(fret === 0 && string !== 1 && styles.zeroFret),

                                        // Highest frets on all but the lowest string
                                        ...(fret === highestDisplayedFret && string !== numberOfStrings && styles.highestFret),
                                    }}
                                >
                                    {displayedNotes[string][fret].isScaleNote &&
                                        <div
                                            style={{
                                                ...styles.noteMarker,
                                                ...(displayedNotes[string][fret].isHighlighted && styles.highlightedNoteMarker),
                                                ...(displayedNotes[string][fret].isChordNote && styles.chordNoteMarker),
                                            }}
                                        >
                                            {displayedNotes[string][fret].isChordNote && displayedNotes[string][fret].chordScaleDegree}
                                        </div>
                                    }
                                    {string === numberOfStrings && markerDotFrets.includes(fret) &&
                                        <div style={styles.fretNumber}>
                                            {fret}
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

const fretWidth = 3;
const fretHeight = 2;

const markerDiameter = 1.5;

const styles = {
    fretboardRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
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
    zeroFret: {
        borderTopStyle: 'none',
    },
    secondLowestStringFret: {
        borderBottomStyle: 'solid',
    },
    lowestStringFret: {
        borderTopStyle: 'none',
        borderLeftStyle: 'solid',
        borderLeftColor: 'rgba(0, 0, 0, 0)',
    },
    highestFret: {
        borderRightStyle: 'solid',
    },
    noteMarker: {
        position: 'absolute',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        top: `${-markerDiameter / 2}rem`,
        left: `${fretWidth / 2 - markerDiameter / 2}rem`,

        width: `${markerDiameter}rem`,
        height: `${markerDiameter}rem`,

        color: 'white',
        backgroundColor: 'lightgrey',
        borderRadius: '100%',
    },
    highlightedNoteMarker: {
        backgroundColor: 'red',
    },
    chordNoteMarker: {
        backgroundColor: 'green',
    },
    fretNumber: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        marginTop: `${markerDiameter / 2}rem`,
    },
};
