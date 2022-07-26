import HttpClient from './index'

class AuthApi extends HttpClient {
    async login(payload) {
        return this.requestType('post').formBody(payload).request(`/login`)
    }
    async logout() {
        return this.requestType('post').request(`/logout`)
    }
    async user() {
        return this.requestType('get').request(`/auth/user`)
    }
}

const authApi = new AuthApi()
export default authApi
