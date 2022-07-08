import { getMunicipioPorEstado } from './municipio.service';
const axios = require('axios');
const url_base = 'http://localhost:3333';

async function getAllEstados() {
  try {
    const {data} = await axios.get(`${url_base}/uf`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getUfOneForId (id) {
  try {
    const {data} = await axios.get(`${url_base}/uf?codigoUF=${id}`)
    return data
  } catch (erro) {
    return erro
  }
};

async function postEstado(obj){
  try {
    const data = await axios.post(`${url_base}/uf`, obj)
    return data
  } catch (erro) {
    return erro
  }
};

/* NÃO É NECESSÁRIO PASSAR CÓDIGO ALGUM */
async function putEstado (obj) {
  try {
    const { data } = await axios.put(`${url_base}/uf`, obj)
    return data
  } catch (erro) {
    return erro
  }
};

//funções para o chart
async function getNomesEstados (){
  try{
    let estados = []
    const data = await getAllEstados();

    data.map(estado => {
      estados.push(estado.nome)
      return ''
    })
    return estados
  }catch (erro) {return erro}
}

async function getAllEstadosLength(){
    try{
      let estadosLength = [];
      let estadosCodigoUF = [];
      
      const data = await getAllEstados();
      data.map(estado => {
        estadosCodigoUF.push(estado.codigoUF)
        return ''
      })

      for(let cont = 0; cont < estadosCodigoUF.length; cont++){
        const { data } = await getMunicipioPorEstado(estadosCodigoUF[cont]);
        estadosLength.push(data.length)
      }
      return estadosLength
    }catch (erro) {return erro}
}

export { getAllEstados, getUfOneForId, postEstado, putEstado, getAllEstadosLength, getNomesEstados };