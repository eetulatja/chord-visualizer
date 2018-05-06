import notes from './notes';


/**
 * Rotate array elements toward the beginning of the array.
 * Negative values for `n` rotate towards the end of the array.
 *
 * @param {*[]} array
 * @param {number} n
 *
 * @return {*[]} Rotated shallow copy of the input array
 */
export function rotate(array, n) {
	n %= array.length;

    const rotated = [ ...array.slice(n), ...array.slice(0, n) ];

    return rotated;
}
