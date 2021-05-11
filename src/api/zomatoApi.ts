import axios from 'axios';

const zomato = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/',
  headers: {
    //JUST A DEMO... gh-pages has no other option
    'user-key': '33a7282f1c4dcc7e978325683859caa8',
  },
});

export default zomato;
