import axios from "axios";

export const API_URL = process.env.API_URL; // set on valid url

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

export default $api;