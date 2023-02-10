// changelog:
// 07-02-23:    some indentation and line breaking editing
//              moved nav items into separate file
//              removed unused variable ID in oneCycle function

import react, { useEffect, useState } from 'react';
import './life.css';
import {inputFields, buttons} from './navItems.js';

function Header({onClick}) {
    return (
        <div className='content__header'>
            <div className="header__help-btn" id="header__help-btn"
                 data-title="About this page" onClick={onClick}>
                 !
            </div>
            <p>This is The Game of Life!</p>
        </div>
    );
}

function Container({ className, id, children }) {
    return (
        <div className={className} id={id}>
            {children}
        </div>
    );
}

function Button({name, id, value, title, onClick, disabled, children}) {
    if(name === 'Generate') disabled = false;
    return (
        <button name={name} id={id} value={value} 
            title={title} onClick={onClick}
            disabled={disabled}>
                {children}
        </button>
    );
}

function Input({name, id, value, maxlength, title, onChange, disabled}) {
    return (
        <input type='text' name={name} id={id} placeholder={value} 
            maxLength={maxlength} title={title} onChange={onChange}
            disabled={disabled}/>
    );
}

function Inputs({disabled, fieldParams, onChange}) {
    return (
        <ul className='nav__list' key='nav__inputs'>
            {inputFields.map((input) => {
                return (
                <li className='nav__item' key={input.name}>
                    {input.lable}<br />
                    <Input
                        name={input.name} 
                        id={input.name} 
                        value={fieldParams[input.name]} 
                        maxlength={input.maxlen}
                        title={input.title} 
                        onChange={onChange}
                        disabled={disabled}
                        />
                </li>
                )
            }
            )}
        </ul>
    );
}

function Buttons({disabled, onClick}) {
    return (
        <ul className='nav__list' key='nav__btns'>
            {buttons.map((btn) => { return (
                <li className='nav__items' key={btn.id}>
                    <Button name={btn.name}
                            id={btn.id}
                            value={btn.value}
                            title={btn.title}
                            onClick={onClick}
                            disabled={disabled}
                            >                            
                        {btn.lable}
                    </Button>
                </li>
            )})}
        </ul>
    );
}

function HelpBtn({hlpTgl, onClick}) {
    return (
        <>
            <div id="help" style={{visibility: hlpTgl ? 'visible' : 'hidden'}}>
                <span id="help__close-btn"
                      className="header__help-btn"
                      onClick={onClick}>
                    X
                </span>
                <p className="help__text">
                    This is an implementation of&nbsp;The&nbsp;Game&nbsp;of&nbsp;Life 
                    originaly devised by the British mathematician John Horton Conway
                    in 1970. It&nbsp;is&nbsp;a cellular automaton game which follows 
                    simple rules of cell evolution:
                </p>
                <ol>
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </ol>
                <p className="help__text">You can set up gaming field by entering size values 
                (10-99 for both dimensions), intial alive perecentage (0-15%, 0 would generate 
                blank field) and evolution speed in miliseconds (40-2000).<br />
                <b>Generate</b> button generates playing field with chosen values.<br />
                <b>1 Cycle</b> would perform one evolution cycle.<br />
                <b>Start Evo</b> - start evolution process with selected speed until 
                <b>Stop Evo</b> button is pressed.<br />
                <b>Clear</b> button stop evolution (if it is running) and clears field 
                by generating new one with same properties.<br />
                Also you can manualy toggle cells at any moment.
                </p>
            </div>
            <div id="help__close" 
                 style={{visibility: hlpTgl ? 'visible' : 'hidden'}} 
                 onClick={onClick}>
            </div>
        </>
    );
}

function Dashboard({dashCounters}) {
    const {gens, deaths, survs, births} = dashCounters;
    return (
        <ul className="nav__list" key='dashboard'>
                <li className="nav__item" key='dash-gen'>
                    Generation #: <span id="gen-counter"><b>{gens}</b> |</span>
                </li>
                <li className="nav__item" key='dash-death'>
                    Deaths: <span id="death-counter"><b>{deaths}</b> |</span>
                </li>
                <li className="nav__item" key='dash-surv'>
                    Survived: <span id="surv-counter"><b>{survs}</b> |</span>
                </li>
                <li className="nav__item" key='dash-birth'>
                    Ressurected: <span id="birth-counter"><b>{births}</b></span>
                </li>
            </ul>
    );
}

function Field({data, onClick}) {
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

export default function App() {
    const [helpToggle, setHelpToggle] = useState(false);
    const [fieldParams, setFieldParams] = useState({sizeX: 10, sizeY: 10, randP: 10, evolS: 50});
    const [fieldArray, setFieldArray] = useState(Array(10).fill(Array(10).fill('alive')));
    const [dashCounters, setDashCounters] = useState({gens: 0, deaths: 0, survs: 0, births: 0});
    const [isGenerated, setIsGenerated] = useState(false);
    const [cycleIntervalId, setCycleIntervalId] = useState(0);

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
            case 'Generate': 
                const next = generateField();
                setFieldArray(next);
                break;
            case 'Cycle': oneCycle(); break;
            case 'StartL': startEvo(); break;
            case 'Stop': stopEvo(); break;
            case 'Clear': clearField(); break;
            default: break;
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
        return nextFieldArray;
    }

    function oneCycle() {
        // deep cloning the array (should work for 2d array). Checking in the orig array, changing in the clone
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

                // i - row / y, j - column / x. A bit counterintuitive, yeah :)
                // Array first level is rows (y), second is columns (x)
                // matrix coords map
                // a (j-1) / c (i-1) | j (j  ) / c (i-1) | b (j+1) / c (i-1)
                // a (j-1) / i (i  ) | j (j  ) / i (i  ) | b (j+1) / i (i  )
                // a       / d (i+1) | j       / d       | b       / d
                a = column - 1; // shortcuts
                b = column + 1;
                c = row - 1;
                d = row + 1;
                // infinite field impementation
                if (row === 0) c = sizeY - 1; if (column === 0) a = sizeX - 1;
                if (row === sizeY - 1) d = 0; if (column === sizeX - 1) b = 0;


                cellNeighbours = Array();
                // ID = (column + 1).toString().padStart(2, 0) + (row + 1).toString().padStart(2, 0);
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

                for (cell = 0; cell < 8; cell++)
                {
                    if (cellNeighbours[cell] === 'alive') aliveCounter++; // checking and counting alive neighbours
                    if (aliveCounter>  3) break; // no point count further so we break
                }

                //applying rules. If alive and <2 and >3 - dead. If 2 or 3 and alive - lives. If 3 and dead - alive
                if (curStatus === 'alive')
                {
                    if (aliveCounter < 2 || aliveCounter > 3)
                    {
                        nextFieldArray[row][column] = 'dead';
                        deaths++;
                    }
                    else {
                       survs++;
                    }
                }
                else if (curStatus === 'dead' && aliveCounter === 3)
                {
                    nextFieldArray[row][column] = 'alive';
                    births++;
                }
            }
        }
    gens++;
    // console.log(gens, deaths, survs, births);
    setDashCounters({gens: gens, deaths: deaths, survs: survs, births: births});
    setFieldArray(nextFieldArray);
    }

    function startEvo() {
        console.log('nothing happens here yet!');
    }

    function stopEvo() {
        console.log('nothing happens here too!');
    }

    function clearField() {
        const {sizeX, sizeY} = fieldParams;
        const nextFieldArray = Array(parseInt(sizeY)).fill(Array(parseInt(sizeX)).fill('dead'));
        setFieldArray(nextFieldArray);
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

    return (
        <div className='content'>
            <Header onClick={onHelpClickHandler} />
            <Container className='content__nav' id='nav'>
                <Inputs 
                    disabled={cycleIntervalId}
                    fieldParams={fieldParams}
                    onChange={(event) => onInputChangeHandler(event)}
                />
                <div className="nav__list--line"></div>
                <Buttons 
                    disabled={!isGenerated} 
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