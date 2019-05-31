// 将一个任意长的数字变成逗号分割的格式
// 1234.56 => "1,234.56" , 123456789 => "123,456,789"
console.log(parseToMoney(1234.56));// return "1,234.56"

function parseToMoney(n) {
    let nstrArr = n.toString().split('.');
    let integer = nstrArr[0];
    let decimal = nstrArr[1] === undefined ? '' : '.' + nstrArr[1];

    function splitNumber(num) {
        let numArr = [];
        while (parseInt(num / 1000, 10) > 0) {
            numArr.unshift(num % 1000);
            num = parseInt(num / 1000, 10);
        }
        numArr.unshift(num % 1000);

        return numArr;
    }

    return `${splitNumber(integer).join(',')}${decimal}`
}

// 正则写法
'1234567891'.replace(/(\d+?)(?=(\d{3})+$)/g, '$1,')