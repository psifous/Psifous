import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  process.env.ADDRESS
);

export default instance;
