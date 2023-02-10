import React from 'react';
import ReactDOM from 'react-dom/client';
import './life.css';
import App from './app.jsx';

// function logIt(str: string | number){
//     return console.log(str);
// }

// type numstr = number | string;
// interface Point { x: number, y: number};

// function prntCoord (pt: Point) {
//     console.log(`x: ${pt.x} | y: ${pt.y}`)
// }

// function printId(Id: numstr) {
//     logIt('Your ID is: ');
//     typeof Id === 'string' ? logIt(Id.toUpperCase()) : logIt(typeof Id); 
// }

// let x: numstr = Math.random() < 0.5 ? 10 : "hello world!";


// prntCoord({x: 10, y: 20});
// printId(42);
// printId('number42');

// function App() {
//     return (
//         <div className="App">გამარჯობა!</div>
//     );
// }

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);