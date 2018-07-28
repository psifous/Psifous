import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x567c8C14c64f114AF1BE2360510Bf10F9E9c196e'
);

export default instance;
