import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0x5af310F0D0bA004BEc866226C4a6B442a9f7aD55'
);

export default instance;
