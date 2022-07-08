import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoxSelector, Option } from '../../BoxSelector';
import StatusMessage from '../../StatusMessage';
import { Input } from '../../Input';
import Button from '../../Button';

import { getAllEstados } from '../../../Api/estado.service';
import { getMunicipioPorEstado, getMunicipioForId } from '../../../Api/municipio.service';
import { postBairro, getBairroForId, putBairro } from '../../../Api/bairro.service';

import {
  MdOutlineRadioButtonUnchecked as CircleIcon,
  MdOutlineRadioButtonChecked as CircleActive,
 } from '../../../Icons/icons';

import style from './styles.module.css';

function FormDestrict() {
  //edição
  const { id } = useParams();
  const navigate = useNavigate();
  const [ currentData, setCurrentData ] = useState([]);
  const [ isEdit, setIsEdit ] = useState(false);

  //FormNome
  const [nome, setNome] = useState('');
  //BoxStatus
  const [ selectorStatus, setSelectorStatus ] = useState('Ativo');
  const [ status, setStatus ] = useState(1);
  //BoxEstados
  const [ selectorUF, setSelectorUF ] = useState('Estado');
  const [ codigoUF, setCodigoUF ] = useState(0);
  const [ estados, setEstados ] = useState([]);
  //BoxCidades
  const [ selectorCity, setSelectorCity ] = useState('Cidade');
  const [ codigoMunicipio, setCodigoMunicipio ] = useState(0);
  const [ municipios, setMunicipios ] = useState([]);

  //MessageErro
  const [ isVisible, setIsVisible ] = useState(false);
  const [ messageErro, setMessageErro ] = useState('');
  const [ isErro, setIsErro ] = useState(false);

  //recupera dados caso seja edição
  useEffect(() => {
    if(id !== undefined){
      setIsEdit(true);

      async function getDistrict(){
        const data = await getBairroForId(id);
        setCurrentData(data);
        setNome(data.nome);
        setStatus(data.status);
        setCodigoMunicipio(data.codigoMunicipio);

        //recupera a cidade
        const cidade = await getMunicipioForId(data.codigoMunicipio);
        setSelectorCity(cidade.data.nome);

        //recupera o estado
        estados.map( estado => {
          if(estado.codigoUF === cidade.data.codigoUF){
            setSelectorUF(estado.nome)
          }
          return ''
        })

      }
      getDistrict() 
    }
  }, [id])

  // verifica o Status selecionado e seta o código do status
  useEffect(()=>{
    if(selectorStatus === 'Ativo') {
        setStatus('1')
    }else{
        setStatus('2')
    }
  }, [selectorStatus, status, setStatus]);
  
  //recupera os estados
  useEffect(() => {
    const estadosData = async () => {
      const data = await getAllEstados();
      setEstados([...data])
    }
    estadosData()
  }, [])

  //recupera as cidades por estado
  useEffect(()=>{
    //Reseta o selector
    setSelectorCity('Cidade')
    
    const municipiosData = async () => {
      const {data} = await getMunicipioPorEstado(codigoUF);
      setMunicipios([...data])
    }
    municipiosData()
  }, [codigoUF, setCodigoUF]);

  //retorna a visibilidade do modal ao false
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 1600);
  }, [isVisible])
  
  async function handlerSave() {
      //salvará os dados
      if(nome.length <= 0){
        setIsVisible(true);
        setIsErro(true);
        setMessageErro('Campo Nome está Vazio...')
      }else{
        
        if(isEdit){
          await putBairro({
                            codigoBairro: currentData.codigoBairro,
                            codigoMunicipio: codigoMunicipio,
                            nome: nome,
                            status: status
                          })
          setIsVisible(true);
          setMessageErro('Bairro Alterado!');
          setIsErro(false);

          setTimeout(() => {
            navigate('/');
          }, 1500);
        }else{

          const data = await postBairro({codigoUF, codigoMunicipio, nome, status})
            
          if(data.request.status === 404){
            setIsVisible(true);
            setMessageErro(data.response.data.mensagem.split('.')[0]);
            setIsErro(true);
          }
          
          if(data.request.status === 200){
            setIsVisible(true);
            setMessageErro("Bairro Cadastrado!");
            setIsErro(false);
          }
        }
  
        setNome('');
        setStatus(0);
        setSelectorStatus('Ativo');
        setSelectorUF('Estado');
        setCodigoUF(0);
        setCodigoMunicipio(0);
        setMunicipios([])
      }
  }

  function CancelEdit(){
    navigate('/');
    setNome('');
    setStatus(0);
    setSelectorStatus('Status');
    setSelectorUF('Estados')
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
            widthOptions={'10rem'}
          >
            <Option
              onClick={(e)=>setSelectorStatus(e.target.innerText)}
            >
              <CircleActive style={{color: '#88CA5E' }}/> 
              Ativo
            </Option>
            <Option
              onClick={(e)=>setSelectorStatus(e.target.innerText)}
            >
              <CircleIcon style={{color: '#b7b7a4' }}/> 
              Desativo
            </Option>
          </BoxSelector>
          {/*********************Estados Box***************/}
          <BoxSelector
            selector={selectorUF}
            widthOptions={'10rem'}
          >
            {
              estados.map((estado) => {
                return <Option
                    onClick={(e) => {
                      setSelectorUF(e.target.innerText)
                      setCodigoUF(estado.codigoUF)
                    }}
                  key={estado.nome}
                >{estado.nome}</Option>
              })
            }
          </BoxSelector>
          {/*********************Cidades Box***************/}
          <BoxSelector
            selector={selectorCity}
            widthOptions={'10rem'}
          >
            {
              municipios.map((municipio) => {
                return <Option
                  onClick={(e) => {
                    setSelectorCity(e.target.innerText)
                    setCodigoMunicipio(municipio.codigoMunicipio)
                  }}
                  key={municipio.nome}
                >{municipio.nome}</Option>
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

export default FormDestrict;