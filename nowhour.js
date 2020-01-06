let now = new Date();

console.log(now.getHours());
console.log(now.getMinutes());
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentHour >=12)
{
    console.log('오후'+(currentHour-12) + '시');
    console.log( ':'+ currentMinute + '분');
}
else
{
    console.log('오전'+currentHour + '시');
    console.log( ':'+ currentMinute + '분');
}
if (currentHour >=12)
{
    console.log(    `오후 ${currentHour-12} 시 `);
    console.log(    `:${currentMinute}분   `);
}
else
{
    console.log( `오전${currentHour-12}시` );
    console.log(`:${currentMinute}분`);
}
let apm ='오전';
if (currentHour >= 12)
{
    apm='오후';

    if (currentHour >=13)
    {
        currentHour-=12;
    }
}
console.log(    `${apm} ${currentHour}시`);

apm = currentHour >=12 ? '오후' : '오전';
currentHour = currentHour >= 13 ? '오전' : '오후';