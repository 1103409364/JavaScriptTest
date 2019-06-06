import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pagination from './Pagination';
import * as serviceWorker from './serviceWorker';

// 分页器组件，接受两个参数：总页数和回调函数
ReactDOM.render(
    <Pagination
        totalPages={31}
        callback={pageIndex => console.log(pageIndex)} />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
