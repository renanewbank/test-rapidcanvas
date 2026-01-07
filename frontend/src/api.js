import axios from 'axios';

// Empty baseURL means "use the current domain/host".
// Since we are using Nginx as a Reverse Proxy, the browser will send 
// requests to the same domain (e.g., localhost or the ngrok URL), 
// and Nginx will route them internally to the backend container.
const api = axios.create({
  baseURL: '', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;