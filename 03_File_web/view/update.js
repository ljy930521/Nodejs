module.exports.update =function(list, navBar, title, desc) {
    return  `
    <!DOCTYPE html>
    <html>
    <head>
        <title>file Web</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/"><p align="center">WEB 프로그래밍 기술</p></a></h1>
        <h3>${list}</h3>
        <hr>

        <h4>${navBar}</h4>
        <hr>
        <h2><p align="center">글 수정하기</p></h2>
        <form action="/update_proc" method="post">
        <input type="hidden" name="oldTitle" value="${title}">
        <p align="center"><input type="text" size= "20" name="title" value="${title}"></p>
        <p align="center"><textarea name="desc" rows="10" cols"60">${desc}</textarea></p>
        <p align="center"><input type="submit" value= "수정"></p>
        </form>
    </body>
    </html>
    `;
}