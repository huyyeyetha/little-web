import axios from 'axios';

const webAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});
const adaAxios = axios.create({
    baseURL: import.meta.env.VITE_ADAFRUIT_URL,
});

webAxios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);
adaAxios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

webAxios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        return Promise.reject(error);
    },
);
adaAxios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export { webAxios, adaAxios };
