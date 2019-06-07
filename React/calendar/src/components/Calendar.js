import React from 'react';
import './Calendar.scss';

function Calendar(props) {
    return (
        <table className="Calendar">
            <thead className="Calendar-head">
                <tr>
                    <th className="prev">&lt; </th>
                    <th colSpan="5" className="">{console.log(props)}</th>
                    <th className="next">&gt; </th>
                </tr>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
            </thead>
            <tbody className="Calendar-body">
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td colSpan="5">today</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Calendar;