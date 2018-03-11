var a = 10;
console.log(a);

var name = '홍길동';
console.log(name);

var intNum = 34;
var singleStr = 'Volvo XC60';
var boolVar = true;
var emptyVar;
var nullVar = null;

console.log(typeof intNum, typeof singleStr, typeof boolVar, typeof emptyVar, typeof nullVar);

var objA = { val: 40 };
var objB = objA;
console.log('objA=' + objA, 'objB=' + objB);
// 참조하면 값이 참조된 값까지 바뀐다 
console.log('objA.val=' + objA.val, 'objB.val=' + objB.val);
objB.val = 50;
console.log('objA.val=' + objA.val, 'objB.val=' + objB.val);
console.log('good' + 'time');
console.log('good' + 3);
console.log(4 + 2);
var time = 0;
console.log('time='+time);
time++;
console.log('time='+time);
