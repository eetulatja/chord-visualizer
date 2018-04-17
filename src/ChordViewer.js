import React, { PureComponent } from 'react';
import _ from 'lodash';

import notes from './notes';
import scales from './scales';
import { getTriadFromScale, getChordType } from './chords';
import Fretboard from './Fretboard';
import tunings, { getTuningbyId } from './tunings';


export default class ChordViewer extends PureComponent {

    constructor(...args) {
        super(...args);

        this.selectChord = this.selectChord.bind(this);
        this.selectScale = this.selectScale.bind(this);
        this.selectDegree = this.selectDegree.bind(this);
        this.selectTuning = this.selectTuning.bind(this);

        this.state = {
            chord: 0,
            scale: 'scale_majorScale',
            degree: 1,
            tuning: getTuningbyId('tuning_guitar_6string_standard'),
        };
    }


    selectChord(event) {
        this.setState({
            chord: Number(event.target.value),
        });
    }

    selectScale(event) {
        this.setState({
            scale: event.target.value,
        });
    }

    selectDegree(event) {
        this.setState({
            degree: Number(event.target.value),
        });
    }

    selectTuning(event) {
        this.setState({
            tuning: getTuningbyId(event.target.value),
        });
    }


    render() {
        const chordScale = scales[this.state.scale].chordScale ? scales[scales[this.state.scale].chordScale] : scales[this.state.scale];
        const selectedChord = getTriadFromScale(chordScale, this.state.degree);

        return (
            <div style={styles.chord}>
                <select
                    value={this.state.chord}
                    onChange={this.selectChord}
                    style={styles.chordSelect}
                >
                    {notes.map((note, i) => (
                        <option key={i} value={i}>{note}</option>
                    ))}
                </select>
                <select
                    value={this.state.scale}
                    onChange={this.selectScale}
                    style={styles.chordSelect}
                >
                    {_.map(scales, scale => (
                        <option key={scale.id} value={scale.id}>{scale.name}</option>
                    ))}
                </select>
                <select
                    value={this.state.degree}
                    onChange={this.selectDegree}
                    style={styles.chordSelect}
                >
                    {[ 1, 2, 3, 4, 5, 6, 7 ].map((degree, i) => (
                        <option key={i} value={degree}>{degree}</option>
                    ))}
                </select>

                <div style={styles.chordNotes}>
                    {selectedChord.map(noteIndex => (
                        <div key={noteIndex} style={styles.chordNote}>
                            {notes[(noteIndex + this.state.chord) % notes.length]}
                        </div>
                    ))}
                    <div style={styles.chordNote}>
                        type: {getChordType(selectedChord).name}
                    </div>
                </div>
                <select
                    value={this.state.tuning.id}
                    onChange={this.selectTuning}
                    style={styles.chordSelect}
                >
                    {tunings.map(tuning => (
                        <option key={tuning.id} value={tuning.id}>{tuning.title}</option>
                    ))}
                </select>

                <Fretboard
                    scale={this.state.scale}
                    rootNote={this.state.chord}
                    tuning={this.state.tuning}
                    style={styles.fretboard}
                />
            </div>
        );
    }

}

const styles = {
    chord: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    chordSelect: {
        margin: 10,
    },
    chordNotes: {
        display: 'flex',
    },
    chordNote: {
        margin: 10,
    },
    fretboard: {
        marginTop: '1rem',
    },
};

