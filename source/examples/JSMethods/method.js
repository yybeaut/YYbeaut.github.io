const arrayToCSV = function(arr, deli = ",") {
    return arr.map((v) => {
        return v.map((x) => {
            return `${x}`;
        }).join(deli);
    }).join(",");
};
console.log(arrayToCSV([
    ['a', 'b'],
    ['c', 'd']
]));
let arrayToCSV = [
    ['a', 'b'],
    ['c', 'd']
];
let an = arrayToCSV.map(v => {
    return v.map(x => {
        return `${x}`;
    }).join(',')
}).join(',')
console.log(an)