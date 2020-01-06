module.exports.create =function(list, navBar) {
    return  `
    <!DOCTYPE html>
    <html>
    <head>
        <title>file Web</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>
        <a href="/"><p align="center">WEB 프로그래밍 기술</p></a></h1>
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
    </html>
    `;
}