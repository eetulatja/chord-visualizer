import _ from 'lodash';

import notes from './notes';
import { normalizeNotes } from './util';
import { getNoteByDegree } from './scales';


export function createChord(rootNote, chordType) {
    const chordNotes = {
        'chord_major': [0, 4, 7],
        'chord_minor': [0, 3, 7],
        'chord_dim': [0, 3, 6],
    }[chordType];

    return chordNotes;
}

export function getTriadFromScale(scale, degree) {
    const chordNotes = [ 0, 2, 4 ].map(chordNote => getNoteByDegree(scale, chordNote + degree - 1));

    return chordNotes;
}

export function getChordType(chordNotes) {
    const rootNoteName = notes[chordNotes[0]];
    const normalizedNotes = normalizeNotes(chordNotes);

    if (_.isEqual(normalizedNotes, [ 0, 4, 7 ])) {
        return {
            name: rootNoteName,
            type: 'chord_major',
        };
    }
    else if (_.isEqual(normalizedNotes, [ 0, 3, 7 ])) {
        return {
            name: `${rootNoteName}m`,
            type: 'chord_minor',
        };
    }
    else if (_.isEqual(normalizedNotes, [ 0, 3, 6 ])) {
        return {
            name: `${rootNoteName}dim`,
            type: 'chord_dim',
        };
    }
}
