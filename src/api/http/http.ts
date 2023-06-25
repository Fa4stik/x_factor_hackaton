import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: "http://textify_app:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
});

export default $api;