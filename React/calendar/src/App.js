import React from 'react';
import Calendar from './components/Calendar';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.init();
    }

    init() {
        let dateNow = new Date();
        this.setState = ({
            'year': dateNow.getFullYear(),
            'month': dateNow.getMonth(),
            'date': dateNow.getDate(),
            'day': dateNow.getDay(),
        })
    }

    render() {
        return (
            <div className="App">
                {/* <p>请选择日期
                <input type="text"></input> </p>*/}
                <Calendar dateNow={this.state} />

            </div>
        );
    }

}

export default App;
