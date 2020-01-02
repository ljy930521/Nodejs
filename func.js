setTimeout(function()
{
    console.log("1초가지남");
},1000);
setInterval(function()
{
    console.log("1초가지남");
},1000);//비동기라 같이나옴

setTimeout(function()
{
    clearInterval(id);    
}, 5600);