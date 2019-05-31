// 将数字转换成中文大写的表示，处理到万级别
function toZhNumber(num) {
    // let numArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //中文数字
    // let digitArr = ['', '十', '百', '千', '万']; //中文数字基
    let numArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; //中文大写数字
    let digitArr = ['', '拾', '佰', '仟', '万']; //中文数字大写基

    // 将数字转为字符串，每一位拆分成数组，转成对应的大写数字，倒序
    let n = num.toString().split('').map((item) => {
        return numArr[item];
    }).reverse();

    let result = [];

    for (let i = 0; i < n.length; i++) {
        if (n[i] !== numArr[0]) {
            result.unshift(digitArr[i % 4]);
            // 补一个 '万'
            if (i > 0 && i % 4 === 0) {
                result.unshift(digitArr[4]);
            }
            result.unshift(n[i]);
        } else if (result[0] !== numArr[0]) {
            result.unshift(numArr[0]);
        }
    }

    if (result[result.length - 1] === numArr[0]) {
        result.splice(result.length - 1);
    }

    return result.join('');
}

// console.log(toZhNumber(12345)); // 壹万贰仟叁佰肆拾伍