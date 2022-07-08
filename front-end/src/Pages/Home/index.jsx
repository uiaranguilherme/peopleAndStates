import React from 'react';
import style from './styles.module.css';

import UserArea from '../../Components/UserArea';
import CardForm from '../../Components/CardForm';
import Search from '../Search';
import Modal from '../../Components/Modal';

import CurrentContext from '../../Context/ContextData';
import { Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div className={style.ContainerHome}>
      <CurrentContext>
        <div className={style.Cadastro}>
          <UserArea />
          <CardForm />
        </div >
        <div className={style.SearchForm}>
          <Search />
        </div>
        <Routes>
          <Route path="modal/*" element={<Modal />} />
        </Routes>
      </CurrentContext>
    </div>
  );
}

export default Home;