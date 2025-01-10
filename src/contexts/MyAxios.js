import axios from "axios";

export const myAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers:{
        'Content-Type':'application/json',
        
    },
});