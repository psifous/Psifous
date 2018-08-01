import web3Socket from './web3socket';
import Election from './build/Election.json';

export default address => {
  return new web3Socket.eth.Contract(JSON.parse(Election.interface), address);
};
