import React, { PureComponent } from 'react';
import _ from 'lodash';

import ChordViewer from './ChordViewer';


class App extends PureComponent {

    constructor(...args) {
        super(...args);

        this.createNewChordViewer = this.createNewChordViewer.bind(this);
        this.copyChordViewer = this.copyChordViewer.bind(this);
        this.removeChordViewer = this.removeChordViewer.bind(this);
        this.toggleControlsVisibility = this.toggleControlsVisibility.bind(this);

        this.state = {
            chordViewers: [
                {
                    id: String(Date.now()),
                    controlsVisible: true,
                },
            ],
        };
    }

    createNewChordViewer() {
        const chordViewers = [
            {
                id: String(Date.now()),
                controlsVisible: true,
            },
            ...this.state.chordViewers,
        ];

        this.setState({ chordViewers });
    }

    copyChordViewer(id, state) {
        const newChordViewerState = {
            id: String(Date.now()),
            initialState: _.cloneDeep(state),
            controlsVisible: true,
        };

        // Hide controls from existing fretboards.
        const currentChordViewers = this.state.chordViewers.map(chordViewer => {
            if (chordViewer.controlsVisible) {
                chordViewer = {
                    ...chordViewer,
                    controlsVisible: false,
                };
            }

            return chordViewer;
        });

        const index = _.findIndex(currentChordViewers, { id });

        // Insert the new fretboard below the one from which it was copied.
        const chordViewers = [
            ...currentChordViewers.slice(0, index + 1),
            newChordViewerState,
            ...currentChordViewers.slice(index + 1),
        ];

        this.setState({ chordViewers });
    }

    removeChordViewer(id) {
        const chordViewers = this.state.chordViewers.filter(chordViewer => chordViewer.id !== id);

        this.setState({ chordViewers });
    }

    toggleControlsVisibility(id, controlsVisible) {
        const chordViewers = this.state.chordViewers.map(chordViewer => {
            if (chordViewer.id === id) {
                chordViewer = {
                    ...chordViewer,
                    controlsVisible: !chordViewer.controlsVisible,
                };
            }
            else if (chordViewer.controlsVisible) {
                // Hide controls from all other fretboards if they're open.
                chordViewer = {
                    ...chordViewer,
                    controlsVisible: false,
                };
            }

            return chordViewer;
        });

        this.setState({ chordViewers });
    }

    render() {
        return (
            <div>
                {this.state.chordViewers.length === 0 &&
                    <button onClick={this.createNewChordViewer}>+</button>
                }
                {this.state.chordViewers.map(({ id, initialState, controlsVisible }) => (
                    <ChordViewer
                        key={id}
                        id={id}
                        copyChordViewer={this.copyChordViewer}
                        removeChordViewer={this.removeChordViewer}
                        initialState={initialState}
                        controlsVisible={controlsVisible}
                        toggleControlsVisibility={this.toggleControlsVisibility}
                    />
                ))}
            </div>
        );
    }

}

export default App;
