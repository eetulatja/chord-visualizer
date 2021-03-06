import React, { PureComponent } from 'react';
import _ from 'lodash';
import download from 'downloadjs';
import FileDownload from 'react-icons/lib/md/file-download';
import FileUpload from 'react-icons/lib/md/file-upload';

import ChordViewer from './ChordViewer';


class App extends PureComponent {

    constructor(...args) {
        super(...args);

        this.createNewChordViewer = this.createNewChordViewer.bind(this);
        this.copyChordViewer = this.copyChordViewer.bind(this);
        this.removeChordViewer = this.removeChordViewer.bind(this);
        this.toggleControlsVisibility = this.toggleControlsVisibility.bind(this);
        this.exportJson = this.exportJson.bind(this);
        this.updateChordViewerState = this.updateChordViewerState.bind(this);
        this.importJson = this.importJson.bind(this);

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

    exportJson() {
        const exportedState = {
            ...this.state,
            chordViewers: this.state.chordViewers.map(chordViewer => _.omit(chordViewer, 'initialState')),
        };

        download(JSON.stringify(exportedState), 'song.json', 'application/json');
    }

    updateChordViewerState(id, state) {
        const chordViewer = _.find(this.state.chordViewers, { id });

        // Do not update via setState to prevent a re-render.
        // TODO Refactor this huge hack in a better way.
        chordViewer.state = state;
    }

    importJson(event) {
        const inputElement = event.target;
        const { files } = inputElement;

        if (files.length === 1) {
            const file = files[0];

            const reader = new FileReader();
            reader.onload = () => {
                const importedState = JSON.parse(reader.result);

                this.setState({
                    ...importedState,
                    chordViewers: importedState.chordViewers.map(chordViewer => ({
                        ...chordViewer,
                        initialState: chordViewer.state,
                    })),
                });

                inputElement.value = '';
            }
            reader.readAsText(file);
        }
    }

    render() {
        return (
            <div>
                <div
                    style={styles.icon}
                    onClick={this.exportJson}
                >
                    <FileDownload
                        title='Export'
                        size='1.5rem'
                    />
                    <span style={styles.iconText}>Export</span>
                </div>
                <label style={styles.icon}>
                    <FileUpload
                        title='Import'
                        size='1.5rem'
                    />
                    <input type='file' name='Import' onChange={this.importJson} style={styles.fileInput}></input>
                    <span style={styles.iconText}>Import</span>
                </label>

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
                        updateChordViewerState={this.updateChordViewerState}
                    />
                ))}
            </div>
        );
    }

}

export default App;

const styles = {
    icon: {
        display: 'inline-block',

        margin: '0.5rem',

        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,

        cursor: 'pointer',
    },
    iconText: {
        margin: '0.4rem',
        lineHeight: 1.5,
    },
    fileInput: {
        display: 'none',
    },
};
