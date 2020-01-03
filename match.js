//입력을 받아서 이멜형식에 맞는지 여부를 알려주는 프로그램
var readline = require('readline');

var r =readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

var regExp =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
r.question("이메일주소입력.",function(answer)
{
    let result =regExp.test(answer);
    console.log(result);
    r.close();
}
);