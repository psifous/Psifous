import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0xB2419e52757C31EE5878ff6Abb82F6C4Ea844eCa'
);

export default instance;
