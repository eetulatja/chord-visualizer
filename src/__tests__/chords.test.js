import {
    getTriadFromScale,
    getChordType,
} from '../chords';
import { getScaleById } from '../scales';


describe('getTriadFromScale', () => {

    it('Create chord (C major, I)', () => {
        const chord = getTriadFromScale(getScaleById('scale_majorScale'), 1, 0);

        expect(chord).toEqual([
            {
                note: 0,
                chordScaleDegree: 1,
            },
            {
                note: 4,
                chordScaleDegree: 3,
            },
            {
                note: 7,
                chordScaleDegree: 5,
            },
        ]);
    });

    it('Create chord (C minor, I)', () => {
        const chord = getTriadFromScale(getScaleById('scale_minorScale'), 1, 0);

        expect(chord).toEqual([
            {
                note: 0,
                chordScaleDegree: 1,
            },
            {
                note: 3,
                chordScaleDegree: 3,
            },
            {
                note: 7,
                chordScaleDegree: 5,
            },
        ]);
    });

    it('Create chord (C major, ii)', () => {
        const chord = getTriadFromScale(getScaleById('scale_majorScale'), 2, 0);

        expect(chord).toEqual([
            {
                note: 2,
                chordScaleDegree: 1,
            },
            {
                note: 5,
                chordScaleDegree: 3,
            },
            {
                note: 9,
                chordScaleDegree: 5,
            },
        ]);
    });

    it('Create chord (D major, ii)', () => {
        const chord = getTriadFromScale(getScaleById('scale_majorScale'), 2, 2);

        expect(chord).toEqual([
            {
                note: 4,
                chordScaleDegree: 1,
            },
            {
                note: 7,
                chordScaleDegree: 3,
            },
            {
                note: 11,
                chordScaleDegree: 5,
            },
        ]);
    });

});

describe('getChordType', () => {

    it('Chord type (major)', () => {
        const chord = getTriadFromScale(getScaleById('scale_majorScale'), 1, 0);

        const chordType = getChordType(chord);

        expect(chordType).toEqual({
            name: 'C',
            type: 'chord_major',
        });
    });

    it('Chord type (minor)', () => {
        const chord = getTriadFromScale(getScaleById('scale_minorScale'), 1, 0);

        const chordType = getChordType(chord);

        expect(chordType).toEqual({
            name: 'Cm',
            type: 'chord_minor',
        });
    });

    it('Chord type (diminished)', () => {
        const chord = getTriadFromScale(getScaleById('scale_minorScale'), 2, 0);

        const chordType = getChordType(chord);

        expect(chordType).toEqual({
            name: 'Ddim',
            type: 'chord_diminished',
        });
    });

    it('Chord type (augmented)', () => {
        const chord = getTriadFromScale(getScaleById('scale_harmonicMinorScale'), 3, 0);

        const chordType = getChordType(chord);

        expect(chordType).toEqual({
            name: 'D#aug',
            type: 'chord_augmented',
        });
    });

});
