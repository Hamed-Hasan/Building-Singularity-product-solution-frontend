import axios from 'axios';

const baseURL = "https://singularity-product-solution-backend.vercel.app";

const api = axios.create({
  baseURL,
});

export default api;
