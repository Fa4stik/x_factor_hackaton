import axios from "axios/index";

interface IArticle {
    url: string[]
}

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.BASE_URL
});

export default class Article {
    static async login() {
        return axios.post<IArticle>('/login', {})
    }
}