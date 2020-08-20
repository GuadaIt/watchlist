import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000",
  json: true,
});

export default client;