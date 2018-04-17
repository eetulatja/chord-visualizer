import _ from 'lodash';


const tunings = [
    {
        id: 'tuning_guitar_6string_standard',
        title: 'Guitar 6-string standard',
        configuration: {
            1: {
                openNote: 53, // E4
            },
            2: {
                openNote: 48, // B3
            },
            3: {
                openNote: 44, // G3
            },
            4: {
                openNote: 39, // D3
            },
            5: {
                openNote: 34, // A2
            },
            6: {
                openNote: 29, // E2
            },
        },
    },
    {
        id: 'tuning_guitar_6string_dropD',
        title: 'Guitar 6-string drop D',
        configuration: {
            1: {
                openNote: 53, // E4
            },
            2: {
                openNote: 48, // B3
            },
            3: {
                openNote: 44, // G3
            },
            4: {
                openNote: 39, // D3
            },
            5: {
                openNote: 34, // A2
            },
            6: {
                openNote: 27, // D2
            },
        },
    },
    {
        id: 'tuning_bass_4string_standard',
        title: 'Bass 4-string standard',
        configuration: {
            1: {
                openNote: 32, // G2
            },
            2: {
                openNote: 27, // D2
            },
            3: {
                openNote: 22, // A1
            },
            4: {
                openNote: 17, // E1
            },
        },
    },
];

export default tunings;

export function getTuningbyId(tuningId) {
    const tuning = _.find(tunings, { id: tuningId });

    return tuning;
}
