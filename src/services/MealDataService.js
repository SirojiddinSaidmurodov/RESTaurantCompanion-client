import axios from "axios";

const url = "http://localhost:8080/meal"

class MealDataService {
    getAll() {
        return axios.get(url)
    }

    delete(id) {
        return axios.delete('http://localhost:8080/meal/' + id)
    }
}

export default new MealDataService();