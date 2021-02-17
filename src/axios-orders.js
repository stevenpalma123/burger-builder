import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f3ea4-default-rtdb.firebaseio.com/'
})


export default instance;