import { getTuningById } from '../tunings';


describe('getTuningById', () => {

	it('Get tuning', () => {
		const tuning = getTuningById('tuning_guitar_6string_standard');

		expect(tuning.id).toEqual('tuning_guitar_6string_standard');
	});

});
