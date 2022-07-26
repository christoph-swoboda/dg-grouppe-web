import axios from "axios";

const api = process.env.MIX_API;
let BaseApi = axios.create({
    baseURL: api
});


let Api = function() {

    const token=localStorage.getItem('token');
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = token;
    }
    return BaseApi;
};

export default Api;
