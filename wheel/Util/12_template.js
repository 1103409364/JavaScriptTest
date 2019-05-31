//简版模板引擎
function render(str, dictionary) {
    return str.replace(/{{(\w+)}}/g, (a, b) => {
        if ( dictionary[b] === undefined ) {
            throw new Error(`dictionary缺少这个key:${b}`)
        }
        return dictionary[b];
    })
}

// test
// console.log(render('我是{{name}}，年龄{{age}}，性别{{sex}}', {
//     name: '小明',
//     age: 18,
//     sex: '男'
// }));

// 结果： 我是姓名，年龄18，性别男。
