const axios = require('axios');
const url_base = 'http://localhost:3333';

async function getAllMunicipios() {
  try {
    const data = await axios.get(`${url_base}/municipio`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getMunicipioForId (id) {
  try {
    const data = await axios.get(`${url_base}/municipio?codigoMunicipio=${id}`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getMunicipioPorEstado (codigoUF) {
  try {
    const data = await axios.get(`${url_base}/municipio?codigoUF=${codigoUF}`)
    return data
  } catch (erro) {
    return erro
  }
};


async function postMunicipio(obj){
  try {
    const data = await axios.post(`${url_base}/municipio`, obj)
    return data
  } catch (erro) {
    return erro
  }
};

/*  DENTRO DO OBJETO É NECESSÁRIO PASSAR O CODIGOUF* */
async function putMunicipio (obj) {
  try {
    const data = await axios.put(`${url_base}/municipio`, obj)
    return data
  } catch (erro) {
    return erro
  }
};
 export { getAllMunicipios, getMunicipioForId, getMunicipioPorEstado, postMunicipio, putMunicipio };