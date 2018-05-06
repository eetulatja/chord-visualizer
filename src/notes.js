const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
];

export default notes;

export function normalizeNotes(array) {
    const normalized = array.map(element => (element - array[0] + notes.length) % notes.length);

    return normalized;
}
