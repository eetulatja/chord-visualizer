import React, { PureComponent } from 'react';
import _ from 'lodash';

import ChordViewer from './ChordViewer';


class App extends PureComponent {

    constructor(...args) {
        super(...args);

        this.copyChordViewer = this.copyChordViewer.bind(this);
        this.removeChordViewer = this.removeChordViewer.bind(this);

        this.state = {
            chordViewers: [
                {
                    id: String(Date.now()),
                },
            ],
        };
    }

    copyChordViewer(state) {
        const newChordViewerState = {
            id: String(Date.now()),
            initialState: _.cloneDeep(state),
        };

        const chordViewers = [
            ...this.state.chordViewers,
            newChordViewerState,
        ];

        this.setState({ chordViewers });
    }

    removeChordViewer(id) {
        const chordViewers = this.state.chordViewers.filter(chordViewer => chordViewer.id !== id);

        this.setState({ chordViewers });
    }

    render() {
        return (
            <div>
                {this.state.chordViewers.map(({ id, initialState }) => (
                    <ChordViewer
                        key={id}
                        id={id}
                        copyChordViewer={this.copyChordViewer}
                        removeChordViewer={this.removeChordViewer}
                        initialState={initialState}
                    />
                ))}
            </div>
        );
    }

}

export default App;
