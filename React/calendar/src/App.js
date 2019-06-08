import React from 'react';
import Calendar from './components/Calendar';

function App() {
    return (
        <div className="App " style = {{'display': 'block'}}>
            <h3>calendar</h3>
            <Calendar callback = {d => console.log(d)} />

        </div>
    );


}

export default App;
