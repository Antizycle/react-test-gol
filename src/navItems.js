export const inputFields = [
    {lable: 'Width', name: 'sizeX', maxlen: '2', value: '30', title: 'Default value is 10, range 10-99'},
    {lable: 'Height', name: 'sizeY', maxlen: '2', value: '30', title: 'Default value is 10, range 10-99'},
    {lable: 'Population', name: 'randP', maxlen: '2', value: '10', title: 'Default value is 10, range 0-15. Input 0 for a blank field'},
    {lable: 'Evo Speed', name: 'evolS', maxlen: '4', value: '100', title: '(40-2000 ms)'}
];
export const buttons = [
    {lable: 'Generate', name: 'Generate', id: 'genField', value: 'Generate', title: 'With input values x, y, intial pop'},
    {lable: '1 Cycle', name: 'Cycle', id: 'cycle', value: 'One Cycle', title: 'Perform one evolution cycle'},
    {lable: 'Start Evo', name: 'StartL', id: 'start', value: 'Start Life', title: 'Start evolution cycling, affected by speed value'},
    {lable: 'Stop Evo', name: 'Stop', id: 'stop-life', value: 'Stop Life', title: 'Stop Evolution cycling'},
    {lable: 'Clear', name: 'Clear', id: 'clear', value: 'Clear', title: 'Clear Field'},
];