import axios from "axios";
import {API_URL} from "../constants/urls";
import {USER_KEY} from "../constants/localStorageConstants";

const api = axios.create({
    baseURL: API_URL.BASE,
});

export const CONFIG = {
    headers: {"x-apisports-key": `${localStorage.getItem(USER_KEY)}`}
}

export default api;