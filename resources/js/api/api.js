import axios from "axios";

const api = process.env.MIX_API;
let BaseApi = axios.create({
    baseURL: api
});


let Api = function() {

    const user=JSON.parse(localStorage.getItem('user'));
    const token=user?.token

    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return BaseApi;
};

export default Api;
