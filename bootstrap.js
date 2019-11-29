import axios from 'axios'

const instance = axios.create({
baseURL: 'http://3.19.190.69/viaticos-api',
//baseURL: 'http://192.168.15.30/usupso/viaticos/API/public',
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
});

export default instance
