import HttpClient from '../index'

class UserApi extends HttpClient {
    async save(payload) {
        return this.requestType('post').formBody(payload).request(`/employees`)
    }
}
const userApi = new UserApi()
export default userApi
