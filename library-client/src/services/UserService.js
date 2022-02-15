import axios from 'axios';

const USERS_REST_API_URL = "http://localhost:8080/api/v1/person";

class UserService {

    getUsers() {
        return axios.get(USERS_REST_API_URL);
    }

    addUser(user) {
        return axios.post(USERS_REST_API_URL, user);
    }

    getUserById(id) {
        return axios.get(USERS_REST_API_URL + "/" + id)
    }
    updateUserById(user) {
        return axios.put(USERS_REST_API_URL + "/" + user.id, user);
    }

    deleteUserById(id) {
        return axios.delete(USERS_REST_API_URL + "/" + id)
    }
}

export default new UserService();