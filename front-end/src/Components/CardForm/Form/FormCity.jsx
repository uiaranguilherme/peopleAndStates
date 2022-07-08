import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoxSelector, Option } from '../../BoxSelector';
import StatusMessage from '../../StatusMessage';
import { Input } from '../../Input';
import Button from '../../Button';

import { getAllEstados } from '../../../Api/estado.service';
import { postMunicipio, getMunicipioForId, putMunicipio } from '../../../Api/municipio.service';

import {
  MdOutlineRadioButtonUnchecked as CircleIcon,
  MdOutlineRadioButtonChecked as CircleActive,
 } from '../../../Icons/icons';

import style from './styles.module.css';

function FormCity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ isEdit, setIsEdit ] = useState(false);
  const [currentData, setCurrentData] = useState({})

  //inputs do formulário
  const [ nome, setNome ] = useState('');
  const [ status, setStatus ] = useState(1);
  const [ codigoUF, setCodigoUF ] = useState(undefined);

  //constantes do bando de dados
  const [ estados, setEstados ] = useState([])

  //BoxSelector
  const [ selectorStatus, setSelectorStatus ] = useState('Ativo');
  //BoxState
  const [ selectorState, setSelectorState ] = useState('Estado');

  //MessageErro
  const [ messageErro, setMessageErro ] = useState('');
  const [ isVisible, setIsVisible ] = useState(false);
  const [ isErro, setIsErro ] = useState(false);

  //seta propriedade caso seja uma edição
  useEffect(() => {
    
    if(id !== undefined){
      setIsEdit(true);
      async function cityDataEdit(){
        const {data} = await getMunicipioForId(id);
        setCurrentData(data);
        setNome(data.nome);
        setCodigoUF(data.codigoUF);
        setStatus(data.status);

        if(data.status === 1){
          setSelectorStatus('Ativo')
        }else{
          setSelectorStatus('Desativo')
        }

        estados.filter(estado => estado.codigoUF === codigoUF ? setSelectorState(estado.nome) : '')
      }
      cityDataEdit()
    }
  }, [id])

  //recupera os estados do banco
  useEffect(() => {
    const estadosData = async () => {
      const data = await getAllEstados();
      setEstados([...data])
    }
    estadosData()
  }, [])

  //seleciona o status caso haja mudança na escolha do selector status
  useEffect(()=>{
    //seleciona o status
    if(selectorStatus === 'Ativo') {
        setStatus(1)
    }else{
        setStatus(2)
    }

  }, [selectorStatus, status])

  //volta o modal de erro a insivel caso haja mudança na visibilidade
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 1600);
  }, [isVisible])

  async function handlerSave() {
    if(nome.length <= 0){
      setIsErro(true);
      setMessageErro('Campos Nome Vazio...');
      setIsVisible(true)

    }else if(codigoUF === undefined){
      setIsErro(true);
      setIsVisible(true)
      setMessageErro('Selecione um Estado.');
    
    }else{
      if(isEdit){
        await putMunicipio({
                            codigoMunicipio: currentData.codigoMunicipio, 
                            codigoUF: codigoUF, 
                            nome: nome, 
                            status: status
                          })

        setIsVisible(true);
        setMessageErro('Cidade alterada!');
        setIsErro(false);

        setTimeout(() => {
          navigate('/')
        }, 1500);

      }else{
        const data = await postMunicipio({codigoUF, nome, status})
          
        if(data.request.status === 404){
          setIsVisible(true);
          setMessageErro(data.response.data.mensagem.split('.')[0]);
          setIsErro(true);
        }
        
        if(data.request.status === 200){
          setIsVisible(true);
          setMessageErro("Cidade Cadastrada!");
          setIsErro(false);
        }
      }

      setNome('');
      setStatus(0);
      setSelectorStatus('Ativo');
      setSelectorState('Estado')
    }
  }
  
  function CancelEdit(){
    navigate('/');
    setNome('');
    setStatus(0);
    setSelectorStatus('Status');
    setSelectorStatus('Estados')
  }

  return (
    <div style={{margin: '0 auto', width: '100%'}}>
      <Input
        value={nome}
        label={'Nome*'}
        width='90%'
        onChange={(e)=> setNome(e.target.value)}
      />
      <div style={{display: 'flex', position : 'relative', width: '100%', height: '5.4rem'}}>
        {/*********************Status Box***************/}
          <BoxSelector
            selector={selectorStatus}
            widthOptions={'15rem'}
          >

            <Option onClick={(e)=>{setSelectorStatus(e.target.innerText)}}>
              <CircleActive style={{color: '#88CA5E' }}/> 
              Ativo
            </Option>

            <Option onClick={(e)=>setSelectorStatus(e.target.innerText)}>
              <CircleIcon style={{color: '#b7b7a4' }}/> 
              Desativo
            </Option>

          </BoxSelector>
          {/*********************Estados Box***************/}
          <BoxSelector
            selector={selectorState}
            widthOptions={'15rem'}
          >
            {
              estados.map((estado) => {
                return( 
                  <Option
                    onClick={(e) => {
                      setSelectorState(estado.nome)
                      setCodigoUF(estado.codigoUF)
                    }}
                    key={estado.codigoUF}
                  >
                    {estado.nome}
                  </Option>
                )
              })
            }
          </BoxSelector>
      </div>
      <div className={style.Buttons}>
              <Button
                height={'3rem'}
                width={'6rem'}
                margin={'0 0.5rem 0 0.5rem'}
                onClick={CancelEdit}
              >
                Cancelar
              </Button>
              <Button
                height={'3rem'}
                width={'5rem'}
                onClick={handlerSave}
              >
                Salvar
              </Button>
      </div>
      <StatusMessage Erro={isErro} messageErro={messageErro} isVisible={isVisible} />
    </div>
  );
}

export default FormCity;