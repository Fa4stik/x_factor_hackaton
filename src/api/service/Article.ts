import axios, { AxiosResponse, AxiosError } from 'axios';
import {IArticle, IErrorArticle} from "./types";
import $api from "../http/http";

// API_URL=http://textify_app:8000/api/v1/

export default class Article {
    static async getArticle(url: string): Promise<{data: IArticle | IErrorArticle, isError: boolean}> {
        try {
            const response: AxiosResponse<IArticle> = await axios.post<IArticle>('http://textify_app:8000/api/v1/article', {url});
            return { data: response.data, isError: false };
        } catch (error) {
            const axiosError: AxiosError<IErrorArticle> = error as AxiosError<IErrorArticle>;
            return { data: axiosError.response?.data || { detail: axiosError.message }, isError: true };
        }
    }
}