import React, { useState }from 'react';
import style from './styles.module.css';
import {
    FaChevronDown as DownIcon
  } from '../../Icons/icons';

export function Option({children, onClick}){
    return(
        <>
            <li onClick={onClick}>{children}</li> 
        </>
    );
}


export function BoxSelector({children, selector, widthOptions = 'auto'}) {

  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  return(
      <div className={style.ContainerSelector}>
          <div
            onClick={()=>setModalIsOpen(!modalIsOpen)}
            className={style.InputSelector}
            >
            {selector}<DownIcon />
          </div>
          <section  
            onClick={()=>setModalIsOpen(false)}
            style={{display: modalIsOpen ? 'block' : 'none', width : widthOptions}}
          >
             {children}
          </section>
      </div>
  );
}
