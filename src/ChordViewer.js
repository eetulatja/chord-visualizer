import React, { PureComponent } from 'react';
import _ from 'lodash';

import notes from './notes';
import scales, { getScaleById, getChordScale } from './scales';
import { getTriadFromScale, getChordType } from './chords';
import Fretboard from './Fretboard';
import tunings, { getTuningById } from './tunings';


export default class ChordViewer extends PureComponent {

    constructor(props) {
        super(props);

        this.selectRootNote = this.selectRootNote.bind(this);
        this.selectScale = this.selectScale.bind(this);
        this.selectChord = this.selectChord.bind(this);
        this.selectTuning = this.selectTuning.bind(this);
        this.increaseMode = this.increaseMode.bind(this);
        this.decreaseMode = this.decreaseMode.bind(this);
        this.copyChordViewer = this.copyChordViewer.bind(this);
        this.removeChordViewer = this.removeChordViewer.bind(this);
        this.toggleShowAllNotes = this.toggleShowAllNotes.bind(this);

        this.state = props.initialState || {
            rootNote: 0,
            scale: 'scale_majorScale',
            chord: 1,
            tuning: getTuningById('tuning_guitar_6string_standard'),
            mode: 1,
            showAllScaleNotes: false,
        };
    }


    selectRootNote(event) {
        this.setState({
            rootNote: Number(event.target.value),
        });
    }

    selectScale(event) {
        this.setState({
            scale: event.target.value,
        });
    }

    selectChord(event) {
        this.setState({
            chord: Number(event.target.value),
        });
    }

    selectTuning(event) {
        this.setState({
            tuning: getTuningById(event.target.value),
        });
    }

    increaseMode() {
        this.setState(prevState => ({
            mode: prevState.mode % getScaleById(prevState.scale).notes.length + 1,
        }));
    }

    decreaseMode() {
        this.setState(prevState => ({
            mode: (prevState.mode - 1 + getScaleById(prevState.scale).notes.length - 1) % getScaleById(prevState.scale).notes.length + 1,
        }));
    }

    copyChordViewer() {
        this.props.copyChordViewer(this.state);
    }

    removeChordViewer() {
        this.props.removeChordViewer(this.props.id);
    }

    toggleShowAllNotes(event) {
        this.setState({
            showAllScaleNotes: event.target.checked,
        });
    }


    render() {
        const chordScale = getChordScale(this.state.scale);
        const selectedChord = getTriadFromScale(chordScale, this.state.chord, this.state.rootNote);

        return (
            <div style={styles.wrapper}>
                <div style={styles.controls}>
                    <label style={styles.input}>
                        Root

                        <select
                            value={this.state.rootNote}
                            onChange={this.selectRootNote}
                        >
                            {notes.map((note, i) => (
                                <option key={i} value={i}>{note}</option>
                            ))}
                        </select>
                    </label>

                    <label style={styles.input}>
                        Scale

                        <select
                            value={this.state.scale}
                            onChange={this.selectScale}
                        >
                            {_.map(scales, scale => (
                                <option key={scale.id} value={scale.id}>{scale.name}</option>
                            ))}
                        </select>
                    </label>

                    <label style={styles.input}>
                        Chord

                        <select
                            value={this.state.chord}
                            onChange={this.selectChord}
                        >
                            {[ 1, 2, 3, 4, 5, 6, 7 ].map((chord, i) => (
                                <option key={i} value={chord}>{chord}</option>
                            ))}
                        </select>

                        <span style={styles.chordNote}>
                            {getChordType(selectedChord).name}
                        </span>

                        Notes:
                        {selectedChord.map(chordNote => (
                            <span key={chordNote.note} style={styles.chordNote}>
                                {notes[chordNote.note]}
                            </span>
                        ))}
                    </label>

                    <label style={styles.input}>
                        Tuning

                        <select
                            value={this.state.tuning.id}
                            onChange={this.selectTuning}
                        >
                            {tunings.map(tuning => (
                                <option key={tuning.id} value={tuning.id}>{tuning.title}</option>
                            ))}
                        </select>
                    </label>

                    <div style={styles.input}>
                        Mode: {this.state.mode}
                        <button onClick={this.decreaseMode}>&lt;</button>
                        <button onClick={this.increaseMode}>&gt;</button>
                    </div>

                    <div style={styles.input}>
                        <button onClick={this.copyChordViewer}>Duplicate</button>
                        <button onClick={this.removeChordViewer}>Remove</button>
                    </div>
                    <label style={styles.input}>
                        Show all notes

                        <input
                            type='checkbox'
                            value={this.state.showAllScaleNotes}
                            onChange={this.toggleShowAllNotes}
                        />
                    </label>
                </div>

                <Fretboard
                    scale={this.state.scale}
                    rootNote={this.state.rootNote}
                    tuning={this.state.tuning}
                    style={styles.fretboard}
                    mode={this.state.mode}
                    chord={selectedChord}
                    showAllScaleNotes={this.state.showAllScaleNotes}
                />
            </div>
        );
    }

}

const styles = {
    wrapper: {
        display: 'flex',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    input: {
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

