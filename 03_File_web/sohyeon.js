var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template = require('./view/template');

var contents = [
    {title:"HTML5", desc:"HTML5 is ..."},
    {title:"CSS3", desc:"CSS3 is ..."},
    {title:"Javascript", desc:"Javascript is ..."},
];

var app = http.createServer(function(req, res) {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;

    if(pathname === '/')
    {
        if(queryData.title === undefined)
        {
            // localhost:3000
            let navBar = template.navMain();
            let title = "Welcome to WEB World";
            let desc = `웹(World Wide Web)의 개방성은 웹사이트나 온라인 애플리케이션을 제작하려는 사람들에게 많은 기회를 
                        제공합니다. 하지만 그 사용 방법을 알아야 웹 기술을 잘 활용할 수 있습니다. 아래의 링크들을 확인하여 
                        다양한 웹 기술을 배워보세요.`;
            fs.readdir('./data', function(err, files) {
                let list = template.List(files);
                let html = template.Html(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
            });
        }
        else
        {
            // localhost:3000/?title=xxx
            let title = queryData.title;
            let navBar = template.navList(title);
            fs.readdir('./data', function(err, files) {
                let list = template.List(files);
                fs.readFile(`./data/${title}.txt`, 'utf-8', function(err, desc) {
                    let html = template.Html(list, navBar, title, desc);
                    res.writeHead(200);
                    res.end(html);
                });             
            });
            for(let content of contents)
            {
                if(content.title === title)
                {
                    desc = content.desc;
                }
            }
        }
    }
    else if(pathname === '/create')
    {
        fs.readdir('./data', function(err, files) {
            let list = template.List(files);
            let navBar = template.navOp();
            let view = require('./view/create');
            let form = view.create(list, navBar);
            res.writeHead(200);
            res.end(form);
        });        
    }
    else if(pathname === '/create_proc')
    {
        var body ='';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let title = post.title;
            let desc = post.desc;
            fs.writeFile(`./data/${title}.txt`, desc, 'utf8', function(err){
                res.writeHead(302, {Location: `./?title=${title}`});
                res.end();
            });
        });
    }
    else if(pathname === '/update')
    {
        let title = queryData.title;
        fs.readdir('./data', function(err, files) {
            let list = template.List(files);
            let navBar = template.navOp();
            fs.readFile(`./data/${title}.txt`, 'utf-8', function(err, desc) {
                let view = require('./view/update');
                let form = view.update(list, navBar, title, desc);
                res.writeHead(200);
                res.end(form);
            });
        });
    }
    else if(pathname === '/update_proc')
    {
        var body ='';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let oldTitle = post.oldTitle;
            let title = post.title;
            let desc = post.desc;
            fs.rename(`./data/${oldTitle}.txt`, `./data/${title}.txt`, function(){
                fs.writeFile(`./data/${title}.txt`, desc, 'utf8', function(err){
                    res.writeHead(302, {Location: `/?title=${title}`});
                    res.end();
                });
            });      
        });
    }
    else if(pathname === '/delete')
    {
        let title = queryData.title;
        fs.readdir('./data', function(err, files) {
            let list = template.List(files);
            let navBar = template.navOp();
            let view = require('./view/delete');
            let form = view.delete(list, navBar, title);
            res.writeHead(200);
            res.end(form);
        });
    }
    else if(pathname === '/delete_proc')
    {
        var body ='';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let title = post.title;

            fs.unlink(`./data/${title}.txt`, function(){
                res.writeHead(302, {Location: `/`});
                res.end();
            });      
        });
    }
    else if(pathname === '/favicon.ico')
    {
        fs.readFile('nodejs.png', function(err, data){
            res.statusCode = 200;
            res.setHeader('Content-type', 'image/png');
            res.end(data);
        });
    }
    else
    {
        res.writeHead(404);
        res.end('Not found');
    }
});
