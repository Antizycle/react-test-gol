import {buttons} from '../navItems.js';

function Button({name, id, value, title, onClick, isGen, isRun, children}) {
  let disabled = isRun;
  if (isGen && name === 'Stop') disabled = !isRun;
  if (!isGen && name !== 'Generate') disabled = !isRun;

  return (
      <button name={name} id={id} value={value} 
          title={title} onClick={onClick}
          disabled={disabled}>
              {children}
      </button>
  );
}

export default function Buttons({isgenerated, isrunning, onClick}) {
  return (
      <ul className='nav__list' key='nav__btns'>
          {buttons.map((btn) => { return (
              <li className='nav__items' key={btn.id}>
                  <Button name={btn.name}
                          id={btn.id}
                          value={btn.value}
                          title={btn.title}
                          onClick={onClick}
                          isGen={isgenerated}
                          isRun={isrunning}
                          >                            
                      {btn.lable}
                  </Button>
              </li>
          )})}
      </ul>
  );
}