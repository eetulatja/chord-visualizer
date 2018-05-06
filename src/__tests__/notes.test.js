import { normalizeNotes } from '../notes';


describe('normalizeNotes', () => {

	it('Normalize ascending notes', () => {
		const normalized = normalizeNotes([ 3, 6, 8 ]);

		expect(normalized).toEqual([ 0, 3, 5 ]);
	});

	it('Normalize descending notes', () => {
		const normalized = normalizeNotes([ 3, 1, 8 ]);

		expect(normalized).toEqual([ 0, 10, 5 ]);
	});

	it('Normalize large notes', () => {
		const normalized = normalizeNotes([ 3, 24, 8 ]);

		expect(normalized).toEqual([ 0, 9, 5 ]);
	});

	it('Normalize negative notes', () => {
		const normalized = normalizeNotes([ 3, -1, 8 ]);

		expect(normalized).toEqual([ 0, 8, 5 ]);
	});

});
