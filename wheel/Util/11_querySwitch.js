// obj 解析一个任意 url 的所有参数为 Object。
// str 解析一obj为 queryString。

/**
结果：
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
*/

let querySwitch = {
	obj: function (url) {
		let queryObj = {};
		let q = url.slice(url.indexOf('?') + 1).split('&');

		q.forEach((item) => {
			let key = item.split('=')[0];
			let value = item.split('=')[1];

			// 先检查 value 为空，然后检查是否需要解码，最后检查能否转为数字
			if (value === undefined) {
				value = true;
			} else if (Number(value)) {
				value = Number(value);
			} else {
				value = decodeURIComponent(value);
			}

			// 检查 key 是否重复，重复的key 将其 value 放到数组中
			if (key in queryObj) {
				let v = queryObj[key];
				queryObj[key] = [];
				queryObj[key].push(v);

				if (Array.isArray(queryObj[key])) {
					queryObj[key].push(value);
				}
			} else {
				queryObj[key] = value;
			}
		})

		return queryObj;
	},

	str: function (json) {
		var arr = []; //结果数组
		for (var k in json) {
			arr.push(k + "=" + encodeURIComponent(json[k]));
		}
		return arr.join("&");
	}
}

// test
var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(querySwitch.obj(url));

// console.log(querySwitch.str(querySwitch.obj(url)));

