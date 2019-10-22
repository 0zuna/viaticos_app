import axios from 'axios'

const instance = axios.create({
//baseURL: 'http://189.207.245.56/viaticos-api/public',
baseURL: 'http://192.168.15.30/usupso/viaticos/API/public',
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
});

export default instance
