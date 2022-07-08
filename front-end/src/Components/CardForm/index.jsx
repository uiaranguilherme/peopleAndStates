import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  BsFillPeopleFill as PeopleIcon, 
  FaClinicMedical as DistrictIcon, 
  MdOutlineRealEstateAgent as StateIcon, 
  FaCity as CityIcon
} from '../../Icons/icons';

import Card from './../Card';
import FormState from './Form/FormState';
import FormCity from './Form/FormCity';
import FormPersonAndAddresses from './Form/FormPerson';
import ChartComponent from '../ChartComponent';
import FormDestrict from './Form/FormDistrict';
import Modal from '../Modal';

import style from './styles.module.css';

function CardForm() {

  return (
    <Card padding={false} height='79%' width='98%'>
      <div className={style.Container}>
        <nav>
          <div>
            <NavLink to='api/state'
              style={({ isActive }) => {
                return {
                  color: isActive ? '#6500B0' : '',
                  backgroundColor: isActive ? '#D396FF' : '',
                }
              }}
            >
              <StateIcon />
              <p>Adicionar Estados</p>
            </NavLink>
          </div>

          <div>
            <NavLink to='api/city/'
              style={({ isActive }) => {
                return {
                  color: isActive ? '#6500B0' : '',
                  backgroundColor: isActive ? '#D396FF' : '',
                }
              }}
            >
              <CityIcon />
              <p>Adicionar Cidade</p>
            </NavLink>
          </div>

          <div>
            <NavLink to='api/district/'
              style={({ isActive }) => {
                return {
                  color: isActive ? '#6500B0' : '',
                  backgroundColor: isActive ? '#D396FF' : '',
                }
              }}
            >
              <DistrictIcon />
              <p>Adicionar Bairros</p>
            </NavLink>
          </div>

          <div>
            <NavLink to='api/person/'
              style={({ isActive }) => {
                return {
                  color: isActive ? '#6500B0' : '',
                  backgroundColor: isActive ? '#D396FF' : '',
                }
              }}
            >
              <PeopleIcon />
              <p>Adicionar Pessoas</p>
            </NavLink>
          </div>
        </nav>
      </div>
      <div className={style.Content}>
        <Routes>
          <Route path="*" element={<ChartComponent/>}/>
          <Route path="api/state/" element={<FormState />} />
          <Route path="api/city/" element={<FormCity />} />
          <Route path="api/district/" element={<FormDestrict />} />
          <Route path="api/person/" element={<FormPersonAndAddresses />} />
        </Routes>
      </div>
    </Card>
  );
}

export default CardForm;