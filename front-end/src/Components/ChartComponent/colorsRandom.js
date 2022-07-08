const arrColors = [
    '#963AE6',
    '#5C1799',
    '#B259FF',
    '#733F63',
    '#BF9D9E',
    '#F4BFCF',
    '#7E55D9',
    '#9E91F2',
    '#302E59',
    '#7209b7',
    '#480ca8',
    '#6930c3',
    '#7400b8',
    '#e0aaff',
    '#5a189a',
    '#240046',
    '#b298dc',
    '#6247aa',
    '#b185db',
    '#a06cd5',
    '#4D4C7D',
    '#363062',
    '#2E0249',
    '#9772FB',
    '#2A2550',
    '#533E85'
];

export function RandomColor () {
    const ramdomNumber = () => { 
        let number = Math.floor( Math.random() * ( 0 + arrColors.length ) + 0 )
        return number
    };
    return arrColors[ramdomNumber()];
}
