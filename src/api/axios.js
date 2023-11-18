import axios from "axios";


const api = axios.create({
    baseURL: 'https://gd2fwccv-7289.use2.devtunnels.ms/api/'
});

export default api;