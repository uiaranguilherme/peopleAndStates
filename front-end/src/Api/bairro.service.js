const axios = require('axios');
const url_base = 'http://localhost:3333';

async function getAllBairro() {
  try {
    const {data} = await axios.get(`${url_base}/bairro`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getBairroForId (id) {
  try {
    const {data} = await axios.get(`${url_base}/bairro?codigoBairro=${id}`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getBairroPorMunicipio (codigoMunicipio){
  try {
    const {data} = await axios.get(`${url_base}/bairro?codigoMunicipio=${codigoMunicipio}`)
    return data
  } catch (erro) {
    return erro
  }
}

async function postBairro(obj){
  try {
    const data = await axios.post(`${url_base}/bairro`, obj)
    return data
  } catch (erro) {
    return erro
  }
};

/*  DENTRO DO OBJ É NECESSÁRIO PASSAR O CODIGOUF E CODIGOMUNICIPIO* */
async function putBairro (obj) {
  try {
    const {data} = await axios.put(`${url_base}/bairro`, obj)
    return data
  } catch (erro) {
    return erro
  }
};
 export { getAllBairro, getBairroForId, getBairroPorMunicipio, postBairro, putBairro };