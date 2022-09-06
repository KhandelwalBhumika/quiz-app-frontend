import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/"
});

instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? token: null;
        config.headers['Accept'] = 'application/json, text/plain, */*'
        config.headers['Content-Type'] = 'application/json'
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;