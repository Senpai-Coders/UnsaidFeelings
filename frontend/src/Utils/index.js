import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:3001/api"
})

export const randomTime = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1) + start)
}