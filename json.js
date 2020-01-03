const jsobject = [
    {name: '이준영', region: '용인'},
    {name: '금대철', region: '인천'}
];

let outputA = JSON.stringify(jsobject);
let outputb = JSON.stringify(jsobject, null, 2);
console.log(typeof(outputA));
console.log(outputA);
console.log(outputb);
console.log('____________________');

let outputC = JSON.parse(outputA);
console.log(typeof(outputC));
console.log(outputC);
