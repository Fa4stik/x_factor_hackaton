import $api, {API_URL} from "../http/http";
import axios from "axios/index";

interface IArticle {
    link: string
}

// const $api = axios.create({
//     withCredentials: true,
//     baseURL: API_URL,
// });

export default class Article {
    static async login() {
        return axios.post('/login', {})
    }
}