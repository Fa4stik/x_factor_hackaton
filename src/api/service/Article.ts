import axios from "axios/index";
import {IArticle} from "./types";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.BASE_URL
});

export default class Article {
    static async getArticle(url: string) {
        return $api.post<IArticle>('/article', {url})
    }
}