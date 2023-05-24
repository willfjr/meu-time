import axios from "axios";
import {API_URL} from "../constants/urls";

const api = axios.create({
    baseURL: API_URL.BASE,
});

export default api;