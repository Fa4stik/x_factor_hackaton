import axios, { AxiosResponse, AxiosError } from 'axios';
import {IArticle, IErrorArticle} from "./types";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.BASE_URL
});

export default class Article {
    static async getArticle(url: string): Promise<{data: IArticle | IErrorArticle, isError: boolean}> {
        try {
            const response: AxiosResponse<IArticle> = await $api.post<IArticle>('/article', {url});
            return { data: response.data, isError: false };
        } catch (error) {
            const axiosError: AxiosError<IErrorArticle> = error as AxiosError<IErrorArticle>;
            return { data: axiosError.response?.data || { detail: axiosError.message }, isError: true };
        }
    }
}