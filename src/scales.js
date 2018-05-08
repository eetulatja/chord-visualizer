import _ from 'lodash';

import { rotate } from './util';
import { normalizeNotes } from './notes';


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

const harmonicMinorScaleNotes = [
    0,
    2,
    3,
    5,
    7,
    8,
    11,
];

const scales = [
    {
        id: 'scale_majorScale',
        name: 'Major scale',
        notes: majorScaleNotes,
        notesPerString: 3,
    },
    {
        id: 'scale_minorScale',
        name: 'Minor scale',
        notes: normalizeNotes(rotate(majorScaleNotes, -2)),
        notesPerString: 3,
    },
    {
        id: 'scale_ionianMode',
        name: 'Ionian mode',
        notes: majorScaleNotes,
        notesPerString: 3,
    },
    {
        id: 'scale_dorianMode',
        name: 'Dorian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 1)),
        notesPerString: 3,
    },
    {
        id: 'scale_phrygianMode',
        name: 'Phrygian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 2)),
        notesPerString: 3,
    },
    {
        id: 'scale_lydianMode',
        name: 'Lydian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 3)),
        notesPerString: 3,
    },
    {
        id: 'scale_mixolydianMode',
        name: 'Mixolydian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 4)),
        notesPerString: 3,
    },
    {
        id: 'scale_aeolianMode',
        name: 'Aeolian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 5)),
        notesPerString: 3,
    },
    {
        id: 'scale_locrianMode',
        name: 'Locrian mode',
        notes: normalizeNotes(rotate(majorScaleNotes, 6)),
        notesPerString: 3,
    },
    {
        id: 'scale_pentatonicMajor',
        name: 'Pentatonic major',
        notes: pentatonicMajorScaleNotes,
        notesPerString: 2,
        chordScale: 'scale_majorScale',
    },
    {
        id: 'scale_pentatonicMinor',
        name: 'Pentatonic minor',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -1)),
        notesPerString: 2,
        chordScale: 'scale_minorScale',
    },
    {
        id: 'scale_pentatonicMixolydian',
        name: 'Pentatonic mixolydian',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -2)),
        notesPerString: 2,
        chordScale: 'scale_mixolydianMode',
    },
    {
        id: 'scale_pentatonicFrygian',
        name: 'Pentatonic phrygian',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -3)),
        notesPerString: 2,
        chordScale: 'scale_phrygianMode',
    },
    {
        id: 'scale_pentatonicDorian',
        name: 'Pentatonic dorian',
        notes: normalizeNotes(rotate(pentatonicMajorScaleNotes, -4)),
        notesPerString: 2,
        chordScale: 'scale_dorianMode',
    },
    {
        id: 'scale_harmonicMinorScale',
        name: 'Harmonic minor scale',
        notes: harmonicMinorScaleNotes,
        notesPerString: 3,
    },
    {
        id: 'scale_harmonicMinorScaleMode2',
        name: 'Harmonic minor scale mode 2 / Locrian #6',
        notes: normalizeNotes(rotate(harmonicMinorScaleNotes, 1)),
        notesPerString: 3,
    },
    {
        id: 'scale_harmonicMinorScaleMode3',
        name: 'Harmonic minor scale mode 3 / Ionian #5',
        notes: normalizeNotes(rotate(harmonicMinorScaleNotes, 2)),
        notesPerString: 3,
    },
    {
        id: 'scale_harmonicMinorScaleMode4',
        name: 'Harmonic minor scale mode 4 / Dorian #4',
        notes: normalizeNotes(rotate(harmonicMinorScaleNotes, 3)),
        notesPerString: 3,
    },
    {
        id: 'scale_harmonicMinorScaleMode5',
        name: 'Harmonic minor scale mode 5 / Phrygian Dominant',
        notes: normalizeNotes(rotate(harmonicMinorScaleNotes, 4)),
        notesPerString: 3,
    },
    {
        id: 'scale_harmonicMinorScaleMode6',
        name: 'Harmonic minor scale mode 6 / Lydian #2',
        notes: normalizeNotes(rotate(harmonicMinorScaleNotes, 5)),
        notesPerString: 3,
    },
    {
        id: 'scale_harmonicMinorScaleMode7',
        name: 'Harmonic minor scale mode 7 / Superlocrian',
        notes: normalizeNotes(rotate(harmonicMinorScaleNotes, 6)),
        notesPerString: 3,
    },
];

export default scales;

export function getScaleById(scaleId) {
    const scale = _.find(scales, { id: scaleId });

    return scale;
}

export function getNoteByDegree(scale, degree) {
    const note = scale.notes[(degree + scale.notes.length) % scale.notes.length];

    return note;
}

export function getChordScale(scaleId) {
    const scale = getScaleById(scaleId);

    const chordScale = scale.chordScale ? getScaleById(scale.chordScale) : scale;

    return chordScale;
}

function getNotesForString(scaleId, rootNote, string, numberOfFrets, showAllScaleNotes) {
    const scale = getScaleById(scaleId);
    const scaleNotes = scale.notes.map(note => (note + rootNote) % 12);

    // TODO Optimization: Move outside to prevent creating a new object on every function call.
    const emptyNote = {
        isScaleNote: false,
        isHighlighted: false,
        isChordNote: false,
        chordScaleDegree: null,
    };

    const positions = _.range(numberOfFrets + 1).map(() => ({ ...emptyNote}));

    if (showAllScaleNotes) {
        for (let i = 0; i <= numberOfFrets; i++) {
            if (scaleNotes.includes((string.openNote + i) % 12)) {
                positions[i] = {
                    ...positions[i],
                    isScaleNote: true,
                };
            }
        }
    }

    return positions;
}

export function getScalePositionsOnFretboard({
    scaleId,
    rootNote,
    stringConfiguration,
    numberOfFrets,
    mode,
    chord,
    showAllScaleNotes,
    positionStart = 1,
    positionEnd = 1,
}) {
    const allPositions =_.mapValues(stringConfiguration, string => getNotesForString(
        scaleId,
        rootNote,
        string,
        numberOfFrets,
        showAllScaleNotes,
    ));

    const numberOfStrings = Object.keys(stringConfiguration).length;

    const scale = getScaleById(scaleId);

    let startingPosition = rootNote + scale.notes[mode - 1];
    while (startingPosition < stringConfiguration[numberOfStrings].openNote) {
        // Assume that the string with the highest number is the lowest string.
        // Start looping from the lowest octave until we find the lowest root note
        // octave that can be played on the lowest string.
        startingPosition += 12;
    }

    // Currently this just assumes that three octaves worth of notes is
    // enough for any scale position...
    const notes = normalizeNotes(rotate(scale.notes, mode - 1));

    const allNotes = [
        ...notes.map(note => note + startingPosition),
        ...notes.map(note => note + startingPosition + 12),
        ...notes.map(note => note + startingPosition + 2 * 12),
    ];
    const notesForStrings = _.slice(_.chunk(allNotes, scale.notesPerString), 0, numberOfStrings);

    // Remove notes from the beginning.
    for (let i = 1; i < positionStart; i++) {
        const string = Math.floor((i - 1) / scale.notesPerString);
        if (notesForStrings[string]) {
            notesForStrings[string].shift();
        }
    }

    // Remove notes from the end.
    for (let i = 1; i < positionEnd; i++) {
        const string = (numberOfStrings - 1) - Math.floor((i - 1) / scale.notesPerString);
        if (notesForStrings[string]) {
            notesForStrings[string].pop();
        }
    }

    const selectedModePositions = _(notesForStrings)
        .mapKeys((stringNotes, index) => numberOfStrings - index)
        .mapValues((stringNotes, string) =>
            _(stringNotes)
                .mapKeys(note => note - stringConfiguration[string].openNote)
                .mapValues(note => {
                    const chordNote = _.find(chord, chordNote => chordNote.note === note % 12);

                    if (_.isUndefined(chordNote)) {
                        return {
                            isScaleNote: true,
                            isHighlighted: true,
                        };
                    }

                    return {
                        isScaleNote: true,
                        isHighlighted: true,
                        isChordNote: true,
                        chordScaleDegree: chordNote.chordScaleDegree,
                    };
                })
                .value()
        )
        .value();

    for (const [ fret, stringPositions ] of Object.entries(selectedModePositions)) {
        for (const [ string, position ] of Object.entries(stringPositions)) {
            allPositions[fret][string] = {
                ...allPositions[fret][string],
                ...position,
            };
        }
    }

    return allPositions;
}
