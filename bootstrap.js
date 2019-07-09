import axios from 'axios'

const instance = axios.create({
baseURL: 'http://10.0.0.88/usupso/Viaticos/API/public',
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
});

export default instance
