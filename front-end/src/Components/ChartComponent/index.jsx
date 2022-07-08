import React, { useState } from 'react';
import style from './styles.module.css';

import ChartCityPerState from './ChartCityPerState';


function ChartComponent() {
  const [ chart, setChart ] = useState(<ChartCityPerState/>);



  return(
        <div className={style.ContainerChart}>
          <section className={style.ContenteChart}>
            <ChartCityPerState/>
          </section>
        </div>
    )
}

export default ChartComponent;