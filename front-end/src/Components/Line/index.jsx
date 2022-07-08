import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.css';
import {
  MdOutlineRadioButtonUnchecked as CircleIcon,
  MdOutlineRadioButtonChecked as CircleActive,
  FiEdit as EditIcon,
  FaChevronDown as DownIcon
} from '../../Icons/icons';

import { putEstado } from '../../Api/estado.service';
import { putMunicipio } from '../../Api/municipio.service';
import { putBairro } from '../../Api/bairro.service';
import { putPessoa } from '../../Api/pessoa.service';
import { getPersonsForDistrict } from '../../Api/pessoa.service';

import { ContextSearch } from '../../Context/ContextModalSearch';

function Status({type, obj, idSearch}){

  const { Search } = useContext(ContextSearch);
  const [ search, setSearch ] = Search();

  const [ isActive, setIsActive ] = useState(false);
  const [ status, setStatus ] = useState(1);
  const [ opacityStatus, setOpacityStatus ] = useState(null);

  useEffect(() => {
    if(obj.status === 1){
      setIsActive(false);
    }else{
      setIsActive(true);
    };
  }, [obj]);

  const SectionStyle = {
    opacity: opacityStatus ? '1' : '0'
  }


  async function handlerClickStatus(){
    setIsActive(!isActive);
    setOpacityStatus(true);
    setTimeout(() => {
      setOpacityStatus(false)
    }, 500);

    if(obj.status === 1){
      obj.status = 2
    }else{
      obj.status = 1
    };

    if(type === 'state'){
      const data = await putEstado(obj);
      setSearch([...data]);
    };

    if(type === 'city'){
      const data = await putMunicipio(obj);
      setSearch([...data]);
    };

    if(type === 'district'){
      const data = await putBairro(obj);
      const filter = data.filter(bairro => bairro.codigoMunicipio === obj.codigoMunicipio);
      setSearch([...filter]);
    };

    if(type === 'person'){
      await putPessoa(obj);
      const reqRestar = await getPersonsForDistrict(idSearch)
      setSearch([...reqRestar])
    };
  }

  return(
    <>
      <div className={style.Icon}>

        <section style={SectionStyle}>
          {isActive ? 'Ativo' : 'Desativado'}
        </section>

        <div onClick={()=>{
          handlerClickStatus()
        }}>
          { isActive ? <CircleActive
                          style={{color: isActive ? '#88CA5E' : ''}}
                      /> : 
                      <CircleIcon 
                          style={{color: isActive ? '' : '#b7b7a4'}}
                      />}
        </div>

      </div>
    </>
  );
};

export function LineStateAndCity({UF , Nome, obj, link, linkModal, type, onClick}){


  return(
    <div className={style.LineState}>
      
      <Status
        obj={obj}
        type={type}
        codigo={UF}
        onClick={()=> console.log('status')}
      />

      <Link to={`/search/${link}`} className={style.Line70}>
        <div onClick={onClick} className={style.StateContent}>
          <section>Click para pesquisar</section>
          {`${UF === undefined ? '' : UF + '-'}  ${Nome}`}
        </div>
      </Link>

      <Link to={`/modal/${linkModal}`}>
        <div className={style.Icon}>
          <EditIcon/>
        </div>
      </Link>
    </div>
  );
}

export function LinePerson({nome, login, senha, idade, obj, type, idSearch, linkModal, onClick}){

  const [ moreInformation, setMoreInformation ] = useState(false)

  const styleSection = {
    display: moreInformation ? 'flex' : 'none',
  }

  return(
    <div className={style.LinePerson} >

      <section className={style.LineDados}>
        <Status 
          type={type}
          obj={obj}
          idSearch={idSearch}
        />
        <div className={style.Line70}
          onClick={()=> setMoreInformation(!moreInformation)}
        >
          {nome}
        </div>
        <Link to={`/modal/${linkModal}`}>
          <div className={style.Icon}>
            <EditIcon
              onClick={onClick}
            />
          </div>
        </Link>
        <div className={style.Icon}>
          <DownIcon onClick={()=> setMoreInformation(!moreInformation)}/>
        </div>
      </section>

      <section className={style.SameDados} style={styleSection}>
        <div>
          <p><strong>Login:</strong> {login}</p>
          <p><strong>Senha:</strong> {senha}</p>
          <p><strong>Idade:</strong> {idade}</p>
        </div>
        <div className={style.Addresses}>
          <p><strong>Endereços.:</strong> <EditIcon/></p>
        </div>
      </section>

    </div>
  );
}