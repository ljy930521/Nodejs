module.exports.delete =function(list, navBar,title) {
    return  `
    <!DOCTYPE html>
    <html>
    <head>
        <title>file Web</title>
        <meta charset="utf-8">
    </head>
    <body><center>

        <h1><a href="/"><p align="center">
        WEB 프로그래밍 기술</p></a></h1>
        <h3>${list}</h3>
        <hr>

        <h4>${navBar}</h4>
        <hr>
        <h2><p align="center">
        글 싹쩨하기</p></h2>
        <form action="/delete_proc" method="post">
        <input type="hidden" name="title" value="${title}">
        <p align="center"><${title}글을 삭제하시겠습니까?></p>
        <p align="center"><input type="submit" value= "확인"></p>
        </form>
    </center>    
    </body>
    </html>`;
}