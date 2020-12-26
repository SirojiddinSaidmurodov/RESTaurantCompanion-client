import axios from "axios";

class DataService {
    getAll(url) {
        return axios.get(url)
    }

    delete(url, id) {
        return axios.delete(url + id)
    }

    get(url, id) {
        return axios.get(url + id)
    }

    update(url, id, item) {
        return axios.put(url + id, item)
    }

    create(url, item) {
        return axios.post(url, item)
    }
}

export default new DataService();