var http = require('http');
var url = require('url');
var fs = require('fs');

function templateHtml(title, desc)  {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Static Web2</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB 프로그래밍 기술</a></h1>
        <h3><ul>
            <li><a href="/?title=HTML5">HTML5</a></li>
            <li><a href="/?title=CSS3">CSS3</a></li>
            <li><a href="/?title=Javascript">Javascript</a></li>
        </ul></h3>
        <hr>
        <h2>${title}</h2>
        <p>${desc}</p>
    </body>
    </html>
    `;
}
var contents = [
    {title:"HTML5", desc:"HTML5 is ...."},
    {title:"CSS3", desc:"CSS3 is ...."},
    {title:"Javascript", desc:"Javascript is ...."}
];
 
var app = http.createServer(function(req, res) {
    //console.log(req.url);
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    //console.log(pathname);
    //console.log(queryData);

    if (pathname === '/') {
        if (queryData.title === undefined) {  // localhost:3000
            let title = "welcome to WEBWORLD";
            let desc =  `웹기술은`;
            let html = templateHtml(title, desc);
            res.writeHead(200);
            res.end(html);
        } else {        // localhost:3000/?title=xxx
            let title = queryData.title;
            let desc;
            for(let content of contents) {
                if (content.title === title) {
                    desc = content.desc;
                }
            }
            console.log(title, desc);
            let html = templateHtml(title, desc);
            res.writeHead(200);
            res.end(html);
        }
    } else if (pathname === '/favicon.ico') {
        fs.readFile('nodejs.png',function(err, data){
            res.statusCode = 200;
            res.setHeader('Content-type', 'image/png');
            res.end(data);
        });

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);