import React from 'react';
import style from './styles.module.css';

function Button({
  children,
  onClick,
  height,
  width,
  margin
}) {
  const styles = {
    height: height,
    width: width,
    margin: margin
  }

  return (
    <>
      <button
        onClick={onClick}
        className={style.Button}
        style={styles}
      >
        {children}
      </button>
    </>
  );
}

export default Button;