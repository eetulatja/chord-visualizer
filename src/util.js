import notes from './notes';


export function rotate(array, n) {
    const rotated = [ ...array.slice(n), ...array.slice(0, n) ];

    return rotated;
}

export function normalizeNotes(array) {
    const normalized = array.map(element => (element - array[0] + notes.length) % notes.length);

    return normalized;
}
