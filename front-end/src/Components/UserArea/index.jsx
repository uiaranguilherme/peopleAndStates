import React from 'react';
import Card from './../Card';
import styles from './styles.module.css';

function UserArea() {
  return (
    <>
      <Card height='18%' width='98%' noShadow>
        <div className={styles.Container}>
          <section></section>
          <div>
            <h3> Seja Bem Vindo! </h3>
            <h2> Uiaran </h2>
          </div>
        </div>
      </Card>
    </>
  );
}

export default UserArea;