import {
	getScaleById,
	getNoteByDegree,
	getChordScale,
	getScalePositionsOnFretboard,
} from '../scales';
import { getTuningById } from '../tunings';
import { getTriadFromScale } from '../chords';


describe('getScaleById', () => {

	it('Get scale', () => {
		const scale = getScaleById('scale_majorScale');

		expect(scale.id).toEqual('scale_majorScale');
	});

});

describe('getNoteByDegree', () => {

	it('Get note', () => {
		const note = getNoteByDegree(getScaleById('scale_majorScale'), 2);

		expect(note).toEqual(4);
	});

	it('Get negative note', () => {
		const note = getNoteByDegree(getScaleById('scale_majorScale'), -2);

		expect(note).toEqual(9);
	});

	it('Get out-of-bounds note', () => {
		const note = getNoteByDegree(getScaleById('scale_majorScale'), 9);

		expect(note).toEqual(4);
	});

});

describe('getChordScale', () => {

	it('Get unspecified chord scale', () => {
		const scale = getChordScale('scale_majorScale');

		expect(scale.id).toEqual('scale_majorScale');
	});

	it('Get specified chord scale', () => {
		const scale = getChordScale('scale_pentatonicMajor');

		expect(scale.id).toEqual('scale_majorScale');
	});

});

describe('getScalePositionsOnFretboard', () => {

	it('Get positions for C major scale (mode 1, chord I)', () => {
		const positions = getScalePositionsOnFretboard(
			'scale_majorScale',
			0,
			getTuningById('tuning_guitar_6string_standard').configuration,
			24,
			1,
			getTriadFromScale(getScaleById('scale_majorScale'), 1, 0), // C major chord
		);

		expect(positions[6][7]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
		expect(positions[6][8]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 1,
		});
		expect(positions[6][10]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[6][12]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 3,
		});
		expect(positions[6][13]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});

		expect(positions[5][7]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
		expect(positions[5][8]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[5][10]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 5,
		});
		expect(positions[5][12]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[5][14]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});

		expect(positions[4][7]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
		expect(positions[4][9]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[4][10]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 1,
		});
		expect(positions[4][12]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[4][14]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
	});

	it('Get positions for C major scale (mode 2, chord iii)', () => {
		const positions = getScalePositionsOnFretboard(
			'scale_majorScale',
			0,
			getTuningById('tuning_guitar_6string_standard').configuration,
			24,
			2,
			getTriadFromScale(getScaleById('scale_majorScale'), 3, 0), // E minor chord
		);

		expect(positions[6][8]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
		expect(positions[6][10]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[6][12]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 1,
		});
		expect(positions[6][13]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[6][15]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});

		expect(positions[5][8]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
		expect(positions[5][10]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 3,
		});
		expect(positions[5][12]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[5][14]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 5,
		});
		expect(positions[5][15]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});

		expect(positions[4][9]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
		expect(positions[4][10]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[4][12]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: true,
			chordScaleDegree: null,
		});
		expect(positions[4][14]).toEqual({
			isScaleNote: true,
			isChordNote: true,
			isHighlighted: true,
			chordScaleDegree: 1,
		});
		expect(positions[4][15]).toEqual({
			isScaleNote: true,
			isChordNote: false,
			isHighlighted: false,
			chordScaleDegree: null,
		});
	});

});
