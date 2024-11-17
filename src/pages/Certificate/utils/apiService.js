import axios from 'axios';

const api = axios.create( {
  baseURL: 'https://eduverse-server-silk.onrender.com/api/v1',
} );

export default api;
