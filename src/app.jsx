import { useState, useReducer } from 'react';
import './life.css';
import Header from './components/header.jsx';
import Container from './components/container.jsx';
import Inputs from './components/inputs.jsx';
import Buttons from './components/buttons.jsx';
import HelpBtn from './components/helpbtn.jsx';
import Dashboard from './components/dashboard.jsx';
import useInterval from './components/useinterval.js';


export default function App() {
    const initialArray = Array(10).fill(Array(10).fill('alive'));
    const [helpToggle, setHelpToggle] = useState(false);
    const [fieldParams, setFieldParams] = useState({sizeX: 10, sizeY: 10, randP: 10, evolS: 50});
    const [dashCounters, setDashCounters] = useState({gens: 0, deaths: 0, survs: 0, births: 0});
    const [isGenerated, setIsGenerated] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const [fieldArray, dispatch] = useReducer(fieldReducer, initialArray);

    function onHelpClickHandler() {
        setHelpToggle(!helpToggle);
    }

    function onInputChangeHandler(event) {
        const name = event.target.name;
        let val = event.target.value;

        // brute value correction if input is out of defined boundries
        if (name === 'sizeX') {
            if (val < 10 || val > 99) {
                val = 10;
            }
        }
        else if (name === 'sizeY') {
            if (val < 10 || val > 99) val = 10;
        }
        else if (name === 'randP') {
            if (val < 0 || val > 15) {
                val = 10;
            }
        }
        else if (name === 'evolS') {
            if (val < 30 || val > 1000) {
                val = 100;
            }
        }
        setFieldParams({...fieldParams, [name]: val});
    }

    function onButtonClickHandler(action) { //Generate, Cycle, StartL, Stop, Clear
        switch(action) {
            case 'Generate': generateField(); break;
            case 'Cycle': oneCycle(); break;
            case 'StartL': startEvo(); break;
            case 'Stop': stopEvo(); break;
            case 'Clear': clearField(); break;
            default: break;
        }
    }

    function fieldReducer(fieldArray, action) {
        switch (action.type) {
            case 'changed': {
                return action.nfa.map(row => row.slice());
            }
            default: {
                console.log('Something went wrong');
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function generateField() {
        const {sizeX, sizeY, randP} = fieldParams;
        let nextFieldArray = Array();

        // generating field with provided size value and randomness. Writing generated field in fieldArray
        for (let row = 1; row <= sizeY; row++) {
            let fieldArrayRow = Array(0);
            for (let column = 1; column <= sizeX; column++) {
                let currentStatus = seedRandomizer(randP);
                fieldArrayRow.push(currentStatus);
            }
        nextFieldArray.push(fieldArrayRow);
        }
        if(!isGenerated) setIsGenerated(true);
        dispatch({
            type: 'changed',
            nfa: nextFieldArray,
        });
    }

    function oneCycle() {
        // deep cloning the array. Checking in the orig array, changing in the clone
        let nextFieldArray = fieldArray.map(item => item.slice());
        let deaths = 0, survs = 0, births = 0;
        let gens = dashCounters.gens;
        const sizeY = nextFieldArray.length;
        const sizeX = nextFieldArray[1].length;
        
        let aliveCounter = 0;
        let cellNeighbours = Array(), curStatus = '';
        let a = 0, b = 0, c = 0, d = 0, row = 0, column = 0, cell = 0;

        for (row = 0; row < sizeY; row++)
        {
            for (column = 0; column < sizeX; column++)
            {
                a = column - 1; // shortcuts
                b = column + 1;
                c = row - 1;
                d = row + 1;
                // infinite field impementation
                if (row === 0) c = sizeY - 1; if (column === 0) a = sizeX - 1;
                if (row === sizeY - 1) d = 0; if (column === sizeX - 1) b = 0;

                cellNeighbours = Array();
                curStatus = fieldArray[row][column]; // getting current cell status
                aliveCounter = 0;

                cellNeighbours.push(fieldArray[c][a]);      // -1 -1  pushing cell neighbours into separete array
                cellNeighbours.push(fieldArray[row][a]);    // -1  0  for ease of further checking
                cellNeighbours.push(fieldArray[d][a]);      // -1 +1
                cellNeighbours.push(fieldArray[c][column]); //  0 -1
                cellNeighbours.push(fieldArray[d][column]); //  0 +1
                cellNeighbours.push(fieldArray[c][b]);      // +1 -1
                cellNeighbours.push(fieldArray[row][b]);    // +1  0
                cellNeighbours.push(fieldArray[d][b]);      // +1 +1

                aliveCounter = cellNeighbours.filter(item => {return item === 'alive';}).length

                //applying rules. If alive and <2 and >3 - dead. If 2 or 3 and alive - lives. If 3 and dead - alive
                if (curStatus === 'alive') {
                    if (aliveCounter < 2 || aliveCounter > 3) {
                        nextFieldArray[row][column] = 'dead';
                        deaths++;
                    } else {
                        survs++;
                    }
                }
                else if (curStatus === 'dead' && aliveCounter === 3) {
                    nextFieldArray[row][column] = 'alive';
                    births++;
                }
            }
        }
    gens++;
    setDashCounters({gens: gens, deaths: deaths, survs: survs, births: births});
    dispatch({
        type: 'changed',
        nfa: nextFieldArray,
    });
    }

    function startEvo() {
        if (!isRunning) {
            setIsRunning(true);
        }
    }

    function stopEvo() {    
        if (isRunning) {
            setIsRunning(false);
        }
    }

    function clearField() {
        const {sizeX, sizeY} = fieldParams;
        const nextFieldArray = Array(parseInt(sizeY)).fill(Array(parseInt(sizeX)).fill('dead'));

        dispatch({
            type: 'changed',
            nfa: nextFieldArray,
        });
        
        setDashCounters({gens: 0, deaths: 0, survs: 0, births: 0});
    }

    function seedRandomizer(randPercent)
    {
        if (randPercent === 0) return 'dead'; // if 0 - generate blank field

        randPercent /= 100; // otherwise generate status for a cell
        const rndm = Math.random();
        if (rndm < randPercent) return 'alive';
        if (rndm >= randPercent) return 'dead';
        else return 'dead';
    }

    function onCellClick(id) {
        const cellX = parseInt(id.id.slice(0,2)); // getting cell coordinates from ID and status from cell className
        const cellY = parseInt(id.id.slice(2));
        const cellStatus = id.className;
        let nextFieldArray = fieldArray.map(item => item.slice()); // cloning array to mutate the clone

        // updating fieldArray state
        if (cellStatus === 'alive') {
            nextFieldArray[cellY][cellX] = 'dead';
            setFieldArray(nextFieldArray);
        }
        if (cellStatus === 'dead') {
            nextFieldArray[cellY][cellX] = 'alive';
            setFieldArray(nextFieldArray);
        }
    }

    function Field({data, onClick}) {
        if (isRunning) useInterval(oneCycle, fieldParams.evolS);
        else useInterval(oneCycle, null);

        return (
            <table className='field' id='field'><tbody>
                {data.map((row, rowIndex) => {return (
                    <tr id={rowIndex} key={'row' + rowIndex}>
                        {row.map((column, colIndex) => {return (
                            <td
                                key={colIndex.toString().padStart(2, '0') + rowIndex.toString().padStart(2, '0')}
                                className={column}
                                id={colIndex.toString().padStart(2, '0') + rowIndex.toString().padStart(2, '0')}
                                onClick={onClick}
                            >
                            </td>
                             )})}
                    </tr>
                )})}
            </tbody></table>
        );
    }

    return (
        <div className='content'>
            <Header onClick={onHelpClickHandler} />
            <Container className='content__nav' id='nav'>
                <Inputs 
                    disabled={isRunning}
                    fieldParams={fieldParams}
                    onChange={(event) => onInputChangeHandler(event)}
                />
                <div className="nav__list--line"></div>
                <Buttons 
                    isgenerated={isGenerated}
                    isrunning={isRunning}
                    onClick={(event) => onButtonClickHandler(event.target.name)}
                />
                <div className="nav__list--line"></div>
                <Dashboard dashCounters={dashCounters}/>
            </Container>
            <Container className='content__field' id='body'>
                <div className="field__container">
                    <Field 
                        data={fieldArray}
                        onClick={(event) => onCellClick(event.target)}
                    />
                </div>
            </Container>
            <Container className='content__footer' id='footer'>
                <p>2022-2023 -- by Antizycle</p>
            </Container>
            <HelpBtn hlpTgl={helpToggle} onClick={onHelpClickHandler} />
        </div>
    );
}