/*let array = [52,123,'도시락','맛없어',true,false];
let array2 = [[1,2,3],[4,5,6]];
let array3 = [[1,2,3],[4,5,6],['a','b','c']];
console.log(array[0] );*/
let num=5
for (let i = 0; i <=num ; i++)
{
    for(let j = 0; j > i; j--)
    { 
        process.stdout.write(' ');
    }
    for(let j = num-1; j < 2*i+1; j++)
    { 
        process.stdout.write('*');
    }

    console.log();
}
