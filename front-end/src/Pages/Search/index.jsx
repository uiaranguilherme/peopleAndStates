import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Card from '../../Components/Card';

import { InputSearch } from '../../Components/Input';

import ResultByStates from '../../Components/Result/ResultByStates';
import ResultByDistrict from '../../Components/Result/ResultByDistrict';
import ResultByPerson from '../../Components/Result/ResultByPerson';
import ResultByCity from '../../Components/Result/ResultByCity';
import LottieComponent from '../../Components/LottieComponent';
import ContextModalSearch from '../../Context/ContextModalSearch'


function Search() {
  
  const [inputValue, setInputValue] = useState('');

  function handleInputSearch(e){
    setInputValue(e.target.value);
  }

  return (
    <Card
      height='100%'
      width='98%'
    >
      <InputSearch
        value={inputValue}
        onChange={(e) => handleInputSearch(e)}
        isShadow={false}
      />
      <Card
        isShadow={false}
        height='89%'
      >
        <div style={{height: '100%'}}>
          <ContextModalSearch>
            <Routes>
              <Route path='*' element={<LottieComponent/>} />
              <Route path='/' element={<ResultByStates valueSearch={inputValue} />} />
              <Route path='/search/city/:id' element={<ResultByCity  valueSearch={inputValue} />} />
              <Route path='/search/district/:id' element={<ResultByDistrict valueSearch={inputValue} />} />
              <Route path='/search/person/:id' element={<ResultByPerson valueSearch={inputValue} />} />
            </Routes>
          </ContextModalSearch>
        </div>
      </Card>
    </Card>
  );
}

export default Search;