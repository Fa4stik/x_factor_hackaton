import axios from "axios";

const API_URL = process.env.API_URL; // set on valid url

const $api = axios.create({
    withCredentials: true,
    baseURL: "http://textify_app:8000/api/v1/",
});

export default $api;