// 三次判断，如果是基本类型直接返回。如果是数组和对象，进行遍历和递归。
function deepClone(o) {
    // 先检查是否是基本类型
    if (
        typeof o === "string"
        ||
        typeof o === "number"
        ||
        typeof o === "boolean"
        ||
        o === undefined
        ||
        o === null
    ) {
        return o;
    } else if (Array.isArray(o)) {
        // 是数组，按照数组的方式遍历
        var newArr = [];
        o.forEach((item) => {
            newArr.push(deepClone(item));
        })
        return newArr;
    } else if (typeof o === "object") {
        // 是对象，按照对象的方式遍历
        var newObj = {};
        for (let k in o) {
            newObj[k] = deepClone(o[k]);
        }
        return newObj;
    }
};