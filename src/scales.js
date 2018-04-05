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

const scales = {
	'scale_majorScale': {
		id: 'scale_majorScale',
		name: 'Major scale',
		notes: majorScaleNotes,
	},
	'scale_minorScale': {
		id: 'scale_minorScale',
		name: 'Minor scale',
		notes: normalizeNotes(rotate(majorScaleNotes, -2)),
	},
	'scale_ionianMode': {
		id: 'scale_ionianMode',
		name: 'Ionian mode',
		notes: majorScaleNotes,
	},
	'scale_dorianMode': {
		id: 'scale_dorianMode',
		name: 'Dorian mode',
		notes: normalizeNotes(rotate(majorScaleNotes, 1)),
	},
	'scale_phrygianMode': {
		id: 'scale_phrygianMode',
		name: 'Phrygian mode',
		notes: normalizeNotes(rotate(majorScaleNotes, 2)),
	},
	'scale_lydianMode': {
		id: 'scale_lydianMode',
		name: 'Lydian mode',
		notes: normalizeNotes(rotate(majorScaleNotes, 3)),
	},
	'scale_mixolydianMode': {
		id: 'scale_mixolydianMode',
		name: 'Mixolydian mode',
		notes: normalizeNotes(rotate(majorScaleNotes, 4)),
	},
	'scale_aeolianMode': {
		id: 'scale_aeolianMode',
		name: 'Aeolian mode',
		notes: normalizeNotes(rotate(majorScaleNotes, 5)),
	},
	'scale_locrianMode': {
		id: 'scale_locrianMode',
		name: 'Locrian mode',
		notes: normalizeNotes(rotate(majorScaleNotes, 6)),
	},
};

export default scales;

export function getNoteByDegree(scale, degree) {
	const note = scale.notes[degree % scale.notes.length];

	return note;
}
