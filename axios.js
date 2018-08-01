import axios from 'axios';

let baseURL = 'http://localhost:3005';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://psifousserver.psifous.com';
}

const instance = axios.create({
  baseURL
});

export default instance;
