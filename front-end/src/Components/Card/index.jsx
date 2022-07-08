import React from 'react';
import styles from './styles.module.css';

function Card({ children, width, height, isShadow = true, padding = true, position = 'relative' }) {

  //estilos adicionais
  const style = {
    height: height,
    width: width,
    boxShadow: isShadow ? '0px 0px 20px 0px rgba(0,0,0,0.18)' : '',
    padding: padding ? '0.5rem' : '',
    position : position,
  }
  return (
    <div
      className={styles.Card}
      style={style}
    >
      {children}
    </div>
  );
}

export default Card;