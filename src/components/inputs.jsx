import {inputFields} from '../navItems.js';

function Input({name, id, value, maxlength, title, onChange, disabled}) {
  return (
      <input type='text' name={name} id={id} placeholder={value} 
          maxLength={maxlength} title={title} onChange={onChange}
          disabled={disabled}/>
  );
}

export default function Inputs({disabled, fieldParams, onChange}) {
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