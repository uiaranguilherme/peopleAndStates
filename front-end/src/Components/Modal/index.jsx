import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Card from '../Card';
import FormState from '../CardForm/Form/FormState';
import FormCity from '../CardForm/Form/FormCity';
import FormDestrict from '../CardForm/Form/FormDistrict';
import FormPersonAndAddresses from '../CardForm/Form/FormPerson';

import style from './styles.module.css';

function Modal() {
  return(
    <div className={style.Whapper}>
      <Card
        height="80%"
        width="40%"
        isShadow={true}
        >
        <section className={style.Title}>
          Editar
        </section>
        <Routes>
          <Route path="/uf/:id" element={<FormState/>}/>
          <Route path="/city/:id" element={<FormCity/>}/>
          <Route path="/district/:id" element={<FormDestrict/>}/>
          <Route path="/person/:id" element={<FormPersonAndAddresses/>}/>
        </Routes>
      </Card>
    </div>
  );
}

export default Modal;