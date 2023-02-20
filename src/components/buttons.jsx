import {buttons} from '../navItems.js';

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

export default function Buttons({disabled, onClick}) {
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