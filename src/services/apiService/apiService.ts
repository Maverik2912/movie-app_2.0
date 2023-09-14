import axios from "axios";

import {baseMoviesURL} from "../../constants";

const apiService = axios.create({baseURL: baseMoviesURL});

apiService.interceptors.request.use(req => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    if(API_KEY) {
        req.headers.Authorization = `Bearer ${API_KEY}`
    }
    return req;
})

export {
    apiService
}