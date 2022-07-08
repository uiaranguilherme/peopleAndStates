import React, { useEffect } from 'react';
import style from './styles.module.css';
import Lottie from 'react-lottie';

import success from '../../Assets/95029-success.json';
import erro from '../../Assets/90569-error.json';

function StatusMessage({ Erro , isVisible, messageErro }) {
  //tempo de animação do card é de 3s, 
  //quer dizer que a função setTimeOut também devera ser de 3 segundos

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Erro ? erro : success,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const stylesCardContent = {
    backgroundColor: 'white',
    display: isVisible ? 'flex' : 'none',
  }
  const styleProgress = {
    backgroundColor: !Erro ? '#2d9e4a' : 'red'
  }
  return (
    <div className={style.CardError} style={stylesCardContent}>
      <div className={style.CardContent} style={stylesCardContent}>
        <Lottie width='30%' weigth="30%" options={defaultOptions}/>
        <div>
          {messageErro}
        </div>
        <section className={style.Progress} style={styleProgress}></section>
      </div>
    </div>
  );
}

export default StatusMessage;