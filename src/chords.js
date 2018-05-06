import _ from 'lodash';

import notes, { normalizeNotes } from './notes';
import { getNoteByDegree } from './scales';


const chordTypes = {
    'chord_major': [ 0, 4, 7 ],
    'chord_minor': [ 0, 3, 7 ],
    'chord_diminished': [ 0, 3, 6 ],
    'chord_augmented': [ 0, 4, 8 ],
};


export function getTriadFromScale(scale, degree, rootNote) {
    const chord = [ 0, 2, 4 ].map(noteDegree => {
        const noteRelativeToRoot = getNoteByDegree(scale, noteDegree + degree - 1);

        const chordNote = {
            note: (noteRelativeToRoot + rootNote) % notes.length,
            chordScaleDegree: noteDegree + 1,
        };

        return chordNote;
    });

    return chord;
}

export function getChordType(chord) {
    const rootNote = _.find(chord, { chordScaleDegree: 1 });
    const rootNoteName = notes[rootNote.note];
    const normalizedNotes = normalizeNotes(_.map(chord, 'note'));

    if (_.isEqual(normalizedNotes, chordTypes['chord_major'])) {
        return {
            name: rootNoteName,
            type: 'chord_major',
        };
    }
    else if (_.isEqual(normalizedNotes, chordTypes['chord_minor'])) {
        return {
            name: `${rootNoteName}m`,
            type: 'chord_minor',
        };
    }
    else if (_.isEqual(normalizedNotes, chordTypes['chord_diminished'])) {
        return {
            name: `${rootNoteName}dim`,
            type: 'chord_diminished',
        };
    }
    else if (_.isEqual(normalizedNotes, chordTypes['chord_augmented'])) {
        return {
            name: `${rootNoteName}aug`,
            type: 'chord_augmented',
        };
    }
}
