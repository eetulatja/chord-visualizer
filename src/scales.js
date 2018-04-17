import _ from 'lodash';

import { rotate, normalizeNotes } from './util';


const majorScaleNotes = [
    0,
    2,
    4,
    5,
    7,
    9,
    11,
];

const pentatonicMajorScaleNotes = [
    0,
    2,
    4,
    7,
    9,
];

const scales = {
    'scale_majorScale': {
        id: 'scale_majorScale',
        name: 'Major scale',
        notes: majorScaleNotes,
        notesPerString: 3,
    },
    'scale_minorScale': {
        id: 'scale_minorScale',
        name: 'Minor scale',
        notes: normalizeNotes(rotate(majorScaleNotes, -2)),
        notesPerString: 3,
    },
    'scale_ionianMode': {
        id: 'scale_ionianMode',
        name: 'Ionian mode',
        notes: majorScaleNotes,
        notesPerString: 3,
    },
    'scale_dorianMode': {
        id: 'scale_dorianMode',
        name: 'Dorian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 1)),
        notesPerString: 3,
    },
    'scale_phrygianMode': {
        id: 'scale_phrygianMode',
        name: 'Phrygian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 2)),
        notesPerString: 3,
    },
    'scale_lydianMode': {
        id: 'scale_lydianMode',
        name: 'Lydian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 3)),
        notesPerString: 3,
    },
    'scale_mixolydianMode': {
        id: 'scale_mixolydianMode',
        name: 'Mixolydian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 4)),
        notesPerString: 3,
    },
    'scale_aeolianMode': {
        id: 'scale_aeolianMode',
        name: 'Aeolian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 5)),
        notesPerString: 3,
    },
    'scale_locrianMode': {
        id: 'scale_locrianMode',
        name: 'Locrian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 6)),
        notesPerString: 3,
    },
    'scale_pentatonicMajor': {
        id: 'scale_pentatonicMajor',
        name: 'Pentatonic major',
        notes: pentatonicMajorScaleNotes,
        notesPerString: 2,
        chordScale: 'scale_majorScale',
    },
    'scale_pentatonicMinor': {
        id: 'scale_pentatonicMinor',
        name: 'Pentatonic minor',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -1)),
        notesPerString: 2,
        chordScale: 'scale_minorScale',
    },
    'scale_pentatonicMixolydian': {
        id: 'scale_pentatonicMixolydian',
        name: 'Pentatonic mixolydian',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -2)),
        notesPerString: 2,
        chordScale: 'scale_mixolydianMode',
    },
    'scale_pentatonicFrygian': {
        id: 'scale_pentatonicFrygian',
        name: 'Pentatonic phrygian',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -3)),
        notesPerString: 2,
        chordScale: 'scale_phrygianMode',
    },
    'scale_pentatonicDorian': {
        id: 'scale_pentatonicDorian',
        name: 'Pentatonic dorian',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -4)),
        notesPerString: 2,
        chordScale: 'scale_dorianMode',
    },
};

export default scales;

export function getNoteByDegree(scale, degree) {
    const note = scale.notes[degree % scale.notes.length];

    return note;
}

export function getScalePositionsOnFretboard(scaleName, rootNote, stringConfiguration) {
    const numberOfStrings = Object.keys(stringConfiguration).length;

    let startingPosition = 25 + rootNote;
    if (startingPosition < stringConfiguration[numberOfStrings].openNote) {
        startingPosition += 12;
    }

    const scale = scales[scaleName];

    // Currently this just assumes that three octaves worth of notes is
    // enough for any scale position...
    const allNotes = [
        ...scale.notes.map(note => note + startingPosition),
        ...scale.notes.map(note => note + startingPosition + 12),
        ...scale.notes.map(note => note + startingPosition + 24),
    ];
    const notesForStrings = _.slice(_.chunk(allNotes, scale.notesPerString), 0, numberOfStrings);

    const positions = _(notesForStrings)
        .mapKeys((stringNotes, index) => numberOfStrings - index)
        .mapValues((stringNotes, string) =>
            _(stringNotes)
                .mapKeys(note => note - stringConfiguration[string].openNote)
                .mapValues(() => true)
                .value()
        )
        .value();

    return positions;
}
