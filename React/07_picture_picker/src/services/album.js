import request from '../utils/request';

// 获得所有图片数据
export function fetch() {
  return request("http://127.0.0.1:3000/api");
}
