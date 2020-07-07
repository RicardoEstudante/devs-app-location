import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-location-backend.herokuapp.com'
});

export default api;