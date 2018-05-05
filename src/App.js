import React, { PureComponent } from 'react';
import _ from 'lodash';

import ChordViewer from './ChordViewer';


class App extends PureComponent {

    constructor(...args) {
        super(...args);

        this.copyChordViewer = this.copyChordViewer.bind(this);

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

    render() {
        return (
            <div>
                {this.state.chordViewers.map(({ id, initialState }) => (
                    <ChordViewer
                        key={id}
                        copyChordViewer={this.copyChordViewer}
                        initialState={initialState}
                    />
                ))}
            </div>
        );
    }

}

export default App;
