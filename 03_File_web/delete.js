var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
function templateHtml(list, navBar, title, desc) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>file Web</title>
            <meta charset="utf-8">
        </head>
        <body>
        
        <h1><p align="center"><a href="/">WEB 프로그래밍 기술</a></p></h1>
            <h3>${list}</h3>
            <hr>

            <h4>${navBar}</h4>
            <hr>
            <h2>${title}</h2>
            <p>${desc}</p>
        </body>
        </html>
    `;
} 
function templateList(filelist)
{
    var list = '<ul>\n';
                for (let file of filelist)
                {
                    //console.log(file);
                    let item = file.substring(0,file.length-4);
                    list +=`<li><a href = "/?title=${item}">${item}</a></li>\n`;
                }
                list += '</ul>';
                return list;
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
            let navBar =    `<p align="center">
            <a href="/">홈으로</a>&nbsp;&nbsp;
            <a href="/create">글쓰기</a></p>`;
            let title =     `<p align="center">
            Welcome to WEB World</p>  `;
            let desc = `<p align="center">웹 기술은 1990년대 초반에 Tim-Berners Lee에 의해 개발되어 빠르게 
            전 세계로 확산되면서 인터넷 세상으로 모든 것을 바꾸어 놓았다.</p>`;
            fs.readdir('./data', function(err, files){
                let list = templateList(files);    
                let html = templateHtml(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
            });
            
        } else {        // localhost:3000/?title=xxx
            let title = queryData.title;
            let navBar = `<p align="center">
            <a href="/">홈으로</a>&nbsp;&nbsp;
            <a href="/update?title=${title}">수정하기</a>&nbsp;&nbsp;
            <a href="/delete?title=${title}">삭제하기</a></p>`;
            fs.readdir('./data', function(err, files){
                let list = templateList(files);
                fs.readFile(`./data/${title}.txt`,'utf8',function(err, desc){
                let html = templateHtml(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
                });
               
            });
            
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', function(err, files){
            let list = templateList(files);
            let navBar = `<p align="center">
            <a href="/">홈으로</a></p>`;
            let html =  `
            <!DOCTYPE html>
            <html>
            <head>
                <title>file Web</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><p align="center">
                <a href="/">WEB 프로그래밍 기술</a></p></h1>
                <h3>${list}</h3>
                <hr>
    
                <h4>${navBar}</h4>
                <hr>
                <h2><p align="center">
                글 작성하기</p></h2>
                <form action="/create_proc" method="post">
                <p align="center"><input type="text" size= "20" name="title" placeholder="제목"></p>
                <p align="center"><textarea name="desc" rows="10" cols"60" placeholder="설명"></textarea></p>
                <p align="center"><input type="submit" value= "작성"></p>
            </body>
            </html>`;
            res.writeHead(200);
            res.end(html);
            })

    } else if (pathname === '/create_proc') {
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let title = post.title;
            let desc = post.desc;
            console.log(title);
            console.log(desc);
            fs.writeFile(`./data/${title}.txt`,desc,'utf8',function(err){
                res.writeHead(302, {Location:   `/?title=${title}`});
                res.end();
            });
        
        });
    } else if (pathname === '/update') {
        fs.readdir('./data', function(err, files){
            let title = queryData.title;
            let list = templateList(files);
            let navBar = `<a href="/">홈으로</a>`;
            fs.readFile(`./data/${title}.txt`,'utf8',function(err, desc){
                    let html =  `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>file Web</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB 프로그래밍 기술</a></h1>
                        <h3>${list}</h3>
                        <hr>
            
                        <h4>${navBar}</h4>
                        <hr>
                        <h2>글 수정하기</h2>
                        <form action="/update_proc" method="post">
                        <input type="hidden" name="oldTitle" value="${title}">
                        <p><input type="text" size= "20" name="title" value="${title}"></p>
                        <p><textarea name="desc" rows="10" cols"60">${desc}</textarea></p>
                        <p><input type="submit" value= "수정"></p>
                        </form>
                    </body>
                    </html>`;
                res.writeHead(200);
                res.end(html);
            });
        });



    } else if (pathname === '/update_proc') {
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let oldTitle = post.oldTitle;
            let title = post.title;
            let desc = post.desc;
            fs.rename(  `./data/${oldTitle}.txt`, `./data/${title}.txt`, function(){
                fs.writeFile(`./data/${title}.txt`, desc, 'utf8', function(err){
                    res.writeHead(302, {Location: `/?title=${title}`});
                    res.end();
                });
            
            });
        
        });
    } else if (pathname === '/delete') { 
        fs.readdir('./data', function(err, files){
            let title = queryData.title;
            let list = templateList(files);
            let navBar = `<a href="/">홈으로</a>`;
            let html =  `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>file Web</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB 프로그래밍 기술</a></h1>
                        <h3>${list}</h3>
                        <hr>
            
                        <h4>${navBar}</h4>
                        <hr>
                        <h2>글 싹쩨하기</h2>
                        <form action="/delete_proc" method="post">
                        <input type="hidden" name="title" value="${title}">
                        <p><${title}글을 삭제하시겠습니까?></p>
                        <p><input type="submit" value= "확인"></p>
                        </form>
                    </body>
                    </html>`;
                res.writeHead(200);
                res.end(html);
            });
        
        
    } else if (pathname === '/delete_proc') {
        var body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let title = post.title;
            fs.unlink(`./data/${title}.txt`, function(err){
                    res.writeHead(302, {Location: '/'});
                    res.end();
                });
            
            });
        
        
    } else if (pathname === '/favicon.ico') {
        fs.readFile('nodejs.png', function(err, data) {
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