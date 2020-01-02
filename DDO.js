var old;
function makeTableRow(a,b,c)
{
    var row =   `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`;
    old ='<tr><td>'+ a +'<tr><td>'+ b +'<tr><td>'+ c 
    return row;

}

console.log(makeTableRow('aaa','bbb','ccc'));