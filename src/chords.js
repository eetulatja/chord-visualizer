import _ from 'lodash';

import notes from './notes';
import { normalizeNotes } from './util';
import { getNoteByDegree } from './scales';


const chordTypes = {
    'chord_major': [ 0, 4, 7 ],
    'chord_minor': [ 0, 3, 7 ],
    'chord_dim': [ 0, 3, 6 ],
    'chord_augmented': [ 0, 4, 8 ],
};


export function createChord(rootNote, chordType) {
    const chordNotes = chordTypes[chordType];

    return chordNotes;
}

export function getTriadFromScale(scale, degree) {
    const chordNotes = [ 0, 2, 4 ].map(chordNote => ({
        note: getNoteByDegree(scale, chordNote + degree - 1),
        chordScaleDegree: chordNote + 1,
    }));

    return chordNotes;
}

export function getChordType(chordNotes) {
    const rootNoteName = notes[chordNotes[0]];
    const normalizedNotes = normalizeNotes(chordNotes);

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
    else if (_.isEqual(normalizedNotes, chordTypes['chord_dim'])) {
        return {
            name: `${rootNoteName}dim`,
            type: 'chord_dim',
        };
    }
    else if (_.isEqual(normalizedNotes, chordTypes['chord_augmented'])) {
        return {
            name: `${rootNoteName}aug`,
            type: 'chord_augmented',
        };
    }
}
