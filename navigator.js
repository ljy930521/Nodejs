var http = require('http');


function navMsg(msg, url) {
        return `
        <!DOCTYPE html>
<html>
    <head>
        <title>alert and Move</title>
        <meta charset="utf-8">
        <script>
        if (navigator.userAgent.toLowerCase().indexOf('iphone') >=0
        ||navigator.userAgent.toLowerCase().indexOf('ipad') >=0
        ||navigator.userAgent.toLowerCase().indexOf('android') >=0
        ||navigator.userAgent.toLowerCase().indexOf('ipod') >=0) {
        alert('모바일 웹 브라우저입니다.');
        }
        else
        {
            alert('데스크톱 웹 브라우저입니다.')
        }
        </script>
    </head>
    <body>
    <h3>경고메세지를 띄워줌</h3>
    <hr>
    </body>    
</html> `;
}
var app =http.createServer(function(request,response)
{
    //console.log(request.url);
    response.writeHead(200);
    let msg =navMsg();
    response.end(msg);
});
app.listen(2000);