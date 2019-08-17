const myString='test1';
const myString2="test1";
const myString3=`
test3
Krieg ${myString2}
`;
const a=666;
const b=66.6;
console.log(myString3);

const myFunction=(c)=> {
    console.log(`black metal ist krieg`);
    console.log(c);
}

myFunction(myString2);

const myArr=[1,2,3,666];
console.log(myArr);
console.log(myArr[2]);
console.log(myArr.length);

const myObj =
{
    name: null,
    age: 22 ,
    gender: 'male',
    myFunc: (a)=> {
        console.log(`black metal ist krieg`);
        console.log(a);
    }
}
console.log(myObj.myFunc(myObj.age));

if (myString == myString2)
{
    console.log('1');
}
else console.log('2');

for (let i=0;i<10;i++)
{
    console.log (i);
}

const arr = [1,2,3,4,5,6,7];
for( let j of arr)
{
    console.log(j*j);
}