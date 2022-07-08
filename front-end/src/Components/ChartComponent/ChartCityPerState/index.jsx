import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAllEstados, getAllEstadosLength, getNomesEstados } from '../../../Api/estado.service';
import { getMunicipioPorEstado } from '../../../Api/municipio.service';

import { RandomColor } from '../colorsRandom';
ChartJS.register(ArcElement, Tooltip, Legend);


function ChartCityPerState() {
  let [estados, setEstados ] = useState([]);
  let [ lengthEstados, setLenghtEstados] = useState([]);
  
  useEffect(() => {
    //pega todos os nomes das ufs cadastradas no banco
    async function getEstados (){
      const nomes = await getNomesEstados()
      setEstados(nomes);

      const length = await getAllEstadosLength();
      setLenghtEstados(length)
    }
    getEstados ()
  }, [])
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        position : 'top',
        display: true,
        text: 'Quantidade de Cidade por Estado',
      },
    },
  };
  const labels = [...estados];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Quantidade de cidade',
        data: [...lengthEstados],
        backgroundColor:[ RandomColor(), RandomColor(), RandomColor(), RandomColor(), RandomColor(), RandomColor(), RandomColor(), RandomColor(), RandomColor(), RandomColor(),]
      }
    ],
  };

  return(
    <div>
      <h3>Quantidade de Cidades por Estado:</h3>
      <Doughnut data={data}  options={options}/>
    </div>
  );
}

export default ChartCityPerState
