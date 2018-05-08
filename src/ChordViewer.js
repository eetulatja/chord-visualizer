import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import MdSettings from 'react-icons/lib/md/settings';
import MdContentCopy from 'react-icons/lib/md/content-copy';
import MdDelete from 'react-icons/lib/md/delete';
import romanNumeral from 'roman-numeral';

import notes from './notes';
import scales, { getScaleById, getChordScale } from './scales';
import { getTriadFromScale, getChordType } from './chords';
import Fretboard from './Fretboard';
import tunings, { getTuningById } from './tunings';


export default class ChordViewer extends PureComponent {

    constructor(props) {
        super(props);

        this.toggleControlsVisibility = this.toggleControlsVisibility.bind(this);
        this.selectRootNote = this.selectRootNote.bind(this);
        this.selectScale = this.selectScale.bind(this);
        this.selectChord = this.selectChord.bind(this);
        this.selectTuning = this.selectTuning.bind(this);
        this.increaseMode = this.increaseMode.bind(this);
        this.decreaseMode = this.decreaseMode.bind(this);
        this.copyChordViewer = this.copyChordViewer.bind(this);
        this.removeChordViewer = this.removeChordViewer.bind(this);
        this.toggleShowAllNotes = this.toggleShowAllNotes.bind(this);
        this.positionStartIncrement = this.positionStartIncrement.bind(this);
        this.positionStartDecrement = this.positionStartDecrement.bind(this);
        this.positionEndIncrement = this.positionEndIncrement.bind(this);
        this.positionEndDecrement = this.positionEndDecrement.bind(this);

        this.state = props.initialState || {
            rootNote: 0,
            scale: 'scale_majorScale',
            chord: 1,
            tuning: getTuningById('tuning_guitar_6string_standard'),
            mode: 1,
            showAllScaleNotes: false,
            positionStart: 1,
            positionEnd: 1,
        };
    }

    componentDidMount() {
        this.props.updateChordViewerState(this.props.id, this.state);
    }

    componentDidUpdate() {
        this.props.updateChordViewerState(this.props.id, this.state);
    }


    toggleControlsVisibility() {
        this.props.toggleControlsVisibility(this.props.id, this.props.controlsVisible);
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
        this.props.copyChordViewer(this.props.id, this.state);
    }

    removeChordViewer() {
        this.props.removeChordViewer(this.props.id);
    }

    toggleShowAllNotes(event) {
        this.setState({
            showAllScaleNotes: event.target.checked,
        });
    }

    positionStartIncrement() {
        this.setState(prevState => ({
            positionStart: prevState.positionStart + 1,
        }));
    }

    positionStartDecrement() {
        this.setState(prevState => ({
            positionStart: prevState.positionStart - 1,
        }));
    }

    positionEndIncrement() {
        this.setState(prevState => ({
            positionEnd: prevState.positionEnd + 1,
        }));
    }

    positionEndDecrement() {
        this.setState(prevState => ({
            positionEnd: prevState.positionEnd - 1,
        }));
    }


    render() {
        const chordScale = getChordScale(this.state.scale);
        const selectedChord = getTriadFromScale(chordScale, this.state.chord, this.state.rootNote);

        return (
            <div style={styles.wrapper}>
                <div style={styles.topRow}>
                    <div style={styles.chordNameContainer}>
                        <div style={styles.chordName}>
                            <span>{romanNumeral.convert(this.state.chord)}</span> <span style={{ fontSize: 'smaller', color: 'darkgray' }}>{getChordType(selectedChord).name}</span>
                        </div>
                    </div>

                    <Fretboard
                        scale={this.state.scale}
                        rootNote={this.state.rootNote}
                        tuning={this.state.tuning}
                        style={styles.fretboard}
                        mode={this.state.mode}
                        chord={selectedChord}
                        showAllScaleNotes={this.state.showAllScaleNotes}
                        positionStart={this.state.positionStart}
                        positionEnd={this.state.positionEnd}
                    />
                </div>

                <div style={styles.controls}>
                    <div style={styles.input}>
                        <MdSettings
                            size='1.5rem'
                            style={styles.icon}
                            color={this.props.controlsVisible ? 'grey' : 'black'}
                            onClick={this.toggleControlsVisibility}
                        />
                        <MdContentCopy
                            size='1.5rem'
                            style={styles.icon}
                            color='black'
                            onClick={this.copyChordViewer}
                        />
                        <MdDelete
                            size='1.5rem'
                            style={styles.icon}
                            color='black'
                            onClick={this.removeChordViewer}
                        />
                    </div>

                    {this.props.controlsVisible &&
                        <Fragment>
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
                                        <option key={i} value={chord}>
                                            {romanNumeral.convert(chord)} ({getChordType(getTriadFromScale(chordScale, chord, this.state.rootNote)).name})
                                        </option>
                                    ))}
                                </select>

                                <span style={styles.notesText}>Notes:</span>
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
                                Start note: {this.state.positionStart}
                                <button onClick={this.positionStartDecrement}>&lt;</button>
                                <button onClick={this.positionStartIncrement}>&gt;</button>
                            </div>

                            <div style={styles.input}>
                                End note: {this.state.positionEnd}
                                <button onClick={this.positionEndDecrement}>&lt;</button>
                                <button onClick={this.positionEndIncrement}>&gt;</button>
                            </div>

                            <label style={styles.input}>
                                Show all notes

                                <input
                                    type='checkbox'
                                    checked={this.state.showAllScaleNotes}
                                    onChange={this.toggleShowAllNotes}
                                />
                            </label>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }

}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    chordNameContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15rem',
    },
    chordName: {
        fontSize: '4rem',
        fontWeight: 500,

        marginRight: '1rem',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    input: {
        margin: '0.5rem',
    },
    icon: {
        margin: '0.5rem',
        marginTop: '-1rem', // TODO REMOVE

        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,

        cursor: 'pointer',
    },
    notesText: {
        marginLeft: '1rem',
    },
    chordNote: {
        margin: '0.5rem',
    },
    fretboard: {
        marginTop: '1rem',
    },
};

