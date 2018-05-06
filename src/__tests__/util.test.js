import {
	rotate,
	normalizeNotes,
} from '../util';


describe('rotate', () => {

	it('Positive rotation', () => {
		const rotated = rotate([ 1, 2, 3 ], 1);

		expect(rotated).toEqual([ 2, 3, 1 ]);
	});

	it('Positive rotation', () => {
		const rotated = rotate([ 1, 2, 3], -2);

		expect(rotated).toEqual([ 2, 3, 1 ]);
	});

	it('Amount zero', () => {
		const array = [ 1, 2, 3 ];
		const rotated = rotate(array, 0);

		// Should create a shallow clone of the array.
		expect(rotated).toEqual([ 1, 2, 3 ]);
		expect(rotated).not.toBe(array);
	});

	it('Amount larger than array length', () => {
		const rotated = rotate([ 1, 2, 3 ], 4);

		expect(rotated).toEqual([ 2, 3, 1 ]);
	});

	it('Empty array', () => {
		const rotated = rotate([], 1);

		expect(rotated).toEqual([]);
	});

	it('Single element array', () => {
		const rotated = rotate([ 1 ], 1);

		expect(rotated).toEqual([ 1 ]);
	});

});
