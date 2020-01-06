module.exports = {
    Html: function(list, navBar, title, desc) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>File Web-module</title>
                <meta charset="utf-8">
            </head>
            <body><center>
                <h1><a href="/"><p align="center">WEB 프로그래밍 기술</a></p></h1>
                <h3>${list}</h3>
                <hr>
                <h4>${navBar}</h4>
                <hr>
                <h2>${title}</h2>
                <p>${desc}</p>
                </center>
            </body>
            </html>
        `;
    },
    List: function(filelist) {
        var list = '<ul>\n';
        for (let file of filelist) {
            let item = file.substring(0, file.length-4);
            list += `<center>
            <li><a href="/?title=${item}">${item}</a></li></center>\n`;
        }
        list += '</ul>';
        return list;
    },
    navMain: function() {
        return `<p align="center">
        <a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/create">글쓰기</a></p>`
    },
    navList: function(title) {
        return `<p align="center">
        <a href="/">홈으로</a>&nbsp;&nbsp;
                <a href="/update?title=${title}">수정하기</a>&nbsp;&nbsp;
                <a href="/delete?title=${title}">삭제하기</a></p>`;
    },
    navOp: function() {
        return `<p align="center">
        <a href="/">홈으로</a></p>`;
    }

}