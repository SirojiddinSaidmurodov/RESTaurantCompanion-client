import axios from "axios";

const url = "http://localhost:8080/meal/"

class MealDataService {
    getAll() {
        return axios.get(url)
    }

    delete(id) {
        return axios.delete(url + id)
    }

    get(id) {
        return axios.get(url + id)
    }

    update(id, meal) {
        return axios.put(url + id, meal)
    }

    create(meal) {
        return axios.post(url, meal)
    }
}

export default new MealDataService();