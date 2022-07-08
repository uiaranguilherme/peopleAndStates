import React, {useState} from 'react';
import Card from './../Card';

import { BiSearchAlt as SearchIcon } from './../../Icons/icons';
import style from './styles.module.css';

export function Input({ 
  value, 
  label, 
  width, 
  backgroundColor, 
  onChange, 
  disabled,
  messageErro
}) {

  const [IsVisibleErro, setIsVisibleErro] = useState(false);

  return (
    <>
      <div
        className={style.Form}
        style={{ width: width }}
      >
        <input
          id={label}
          type="text"
          value={value}
          placeholder='so para efeito'
          onChange={onChange}
          disabled={disabled}
          onClick={()=> setIsVisibleErro(false)}
          onBlur={() => setIsVisibleErro(true)}
        />
        <label
          style={{ backgroundColor: `${backgroundColor}` }}
          for={label}
        >{label}</label>

      </div>
      <section
        style={{opacity: IsVisibleErro ? '1' : '0'}}
        className={style.MessageErro}>
        {messageErro}
      </section>
    </>
  );
}


export function InputSearch({ height, width, value, onChange, onClick, isShadow, placeholder = 'O que deseja Pesquisar ?' }) {
  return (
    <div className={style.Card}>
      <Card
        height={height}
        width={width}
        isShadow={isShadow}
      >
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
        <SearchIcon onClick={onClick} />
      </Card>
    </div>
  );
}
