import React from 'react';
import './Calendar.scss';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.dateNow = new Date();
        this.state = {
            // 今天的年月日周
            'tdYear': this.dateNow.getFullYear(),
            'tdMonth': this.dateNow.getMonth(), //月份 0 到 11
            'tdDate': this.dateNow.getDate(),
            'tdDay': this.dateNow.getDay(),
            // 选中的年月日周
            'selecYear': this.dateNow.getFullYear(),
            'selecMonth': this.dateNow.getMonth(),
            'selecDate': this.dateNow.getDate(),
            'selecDay': this.dateNow.getDay(),
        }
    }
    // 计算某月的天数,计算方法：下月的上一天,也就是本月的最后一天，就是天数
    getMonDays(Y, M) {
        // 先得到下一个月第一天的date对象
        let d = new Date(Y, M + 1, 1);
        // d-1毫秒就是这月的最后一天
        return (new Date(d - 1)).getDate();
    }
    // 计算某月一号是星期几
    get1day(Y, M) {
        let d = new Date(Y, M, 1);
        return d.getDay();
    }
    // 设置新的日期
    setDate(Y, M, D) {
        D = D !== undefined ? D : this.state.selecDate;

        let d = new Date(Y, M, D);
        this.setState({
            'selecYear': d.getFullYear(),
            'selecMonth': d.getMonth(),
            'selecDate': d.getDate(),
            'selecDay': d.getDay(),
        });

        let selec = {
            'year': d.getFullYear(),
            'month': d.getMonth() + 1,
            'date': d.getDate(),
            'day': d.getDay(),
        }
        // 回调函数，参数为选中的年月日周组成的对象
        this.props.callback(selec);
    }

    nextMonth() {
        this.setDate(this.state.selecYear, this.state.selecMonth + 1);
    }

    nextYear() {
        this.setDate(this.state.selecYear + 1, this.state.selecMonth);
    }

    prevMonth() {
        this.setDate(this.state.selecYear, this.state.selecMonth - 1);
    }
    prevYear() {
        this.setDate(this.state.selecYear - 1, this.state.selecMonth);
    }
    // 判断当前日历页，是不是当前月
    isThisMon() {
        if (this.state.tdYear === this.state.selecYear
            && this.state.tdMonth === this.state.selecMonth
        ) {
            return true
        } else {
            return false;
        }
    }

    render() {
        const LEN = 42;
        const DAYARR = ['日', '一', '二', '三', '四', '五', '六'];
        // 这个月的天数
        let thisMonDays = this.getMonDays(this.state.selecYear, this.state.selecMonth);
        // 上个月的天数
        let prevMonDays = this.getMonDays(this.state.selecYear, this.state.selecMonth - 1);

        // td 数组，长度42，存放当前页所有的日期，包含当前月，上个月，下个月
        let tdArr = [];

        // 当前月
        let thisMonArr = [...Array(thisMonDays + 1).keys()].slice(1);

        thisMonArr = thisMonArr.map((item) => {
            return (<td
                className={item === this.state.tdDate && this.isThisMon() ? 'cur today ' : 'cur'}
                key={item}
                onClick={() => this.setDate(this.state.selecYear, this.state.selecMonth, item)}
            >{item}
            </td>)
        })

        // 上个月
        // 根据每月1号是周几，填充数组开头部分
        for (let i = 0; i < this.get1day(this.state.selecYear, this.state.selecMonth); i++) {
            tdArr.unshift(<td
                onClick={() => this.setDate(this.state.selecYear, this.state.selecMonth - 1, prevMonDays - i)}
                key={prevMonDays - i}
            >{prevMonDays - i}
            </td>);
        }

        tdArr = tdArr.concat(thisMonArr);

        // 下个月
        // 剩余长度
        let l = LEN - tdArr.length;
        for (let i = 0; i < l; i++) {
            tdArr.push(<td
                key={i + 1}
                onClick={() => this.setDate(this.state.selecYear, this.state.selecMonth + 1, i + 1)}
            >{i + 1}
            </td>);
        }
        // 日历的每一行，值初始化为下标
        let trArr = [...Array(7).keys()]

        return (
            <table className="Calendar">
                <thead className="Calendar-head">
                    <tr>

                        <th className="prevY" onClick={() => this.prevYear()}>&lt;&lt;</th>
                        <th className="prevM" onClick={() => this.prevMonth()}>&lt; </th>
                        <th colSpan="3" className="">
                            {
                                `${this.state.selecYear} 年 ${this.state.selecMonth + 1} 月`
                            }
                        </th>
                        <th className="nextM" onClick={() => this.nextMonth()}>&gt; </th>
                        <th className="nextY" onClick={() => this.nextYear()}>&gt;&gt;</th>
                    </tr>
                    <tr>
                        {
                            DAYARR.map((item) => <th key={item}>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="Calendar-body">
                    {
                        trArr.map((item, index) => {
                            return (
                                <tr key={item}>
                                    {tdArr.slice(index * 7, index * 7 + 7)}
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td
                            colSpan="7"
                            onClick={() => this.setDate(this.state.tdYear, this.state.tdMonth, this.state.tdDate)}
                        >{`今天 ${this.state.tdYear}-${this.state.tdMonth + 1}-${this.state.tdDate} 周${DAYARR[this.state.tdDay]}`}</td>
                    </tr>
                </tfoot>
            </table>
        )
    }

}

export default Calendar;