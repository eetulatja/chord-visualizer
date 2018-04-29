import _ from 'lodash';


const tunings = [
    {
        id: 'tuning_guitar_6string_standard',
        title: 'Guitar 6-string standard',
        configuration: {
            1: {
                openNote: 52, // E4
            },
            2: {
                openNote: 47, // B3
            },
            3: {
                openNote: 43, // G3
            },
            4: {
                openNote: 38, // D3
            },
            5: {
                openNote: 33, // A2
            },
            6: {
                openNote: 28, // E2
            },
        },
    },
    {
        id: 'tuning_guitar_6string_dropD',
        title: 'Guitar 6-string drop D',
        configuration: {
            1: {
                openNote: 52, // E4
            },
            2: {
                openNote: 47, // B3
            },
            3: {
                openNote: 43, // G3
            },
            4: {
                openNote: 38, // D3
            },
            5: {
                openNote: 33, // A2
            },
            6: {
                openNote: 26, // D2
            },
        },
    },
    {
        id: 'tuning_bass_4string_standard',
        title: 'Bass 4-string standard',
        configuration: {
            1: {
                openNote: 31, // G2
            },
            2: {
                openNote: 26, // D2
            },
            3: {
                openNote: 21, // A1
            },
            4: {
                openNote: 16, // E1
            },
        },
    },
];

export default tunings;

export function getTuningById(tuningId) {
    const tuning = _.find(tunings, { id: tuningId });

    return tuning;
}
