var http = require('http');

function alertMsg(msg, url) {
        return `
        <!DOCTYPE html>
<html>
    <head>
        <title>alert and Move</title>
        <meta charset="utf-8">
        <script>
            var input = prompt('글자를 입력해주세요','힌트')

            alert("${msg}");
            location.href = "${url}";
        </script>
    </head>
    <body>
    </body>    
</html> `;
}
var app =http.createServer(function(request,response)
{
    response.writeHead(200);
    let alert = alertMsg("경고창에 뜨는 메세지","https://www.naver.com/")
    response.end(alert);
});
app.listen(3000);