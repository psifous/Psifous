import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x352aF664aF1cD1ed9d1af6D3a4da294031A78e17'
);

// OLD ADDRESS - Using Etherium Public Address as key

// '0xB2419e52757C31EE5878ff6Abb82F6C4Ea844eCa'
export default instance;
