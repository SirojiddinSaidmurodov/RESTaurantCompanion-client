import axios from "axios";

const url = "http://localhost:8080/meal"

class MealDataService {
    getAll() {
        return axios.get(url)
    }
}

export default new MealDataService();