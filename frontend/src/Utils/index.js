import axios from "axios";

let API = axios.create({
    baseURL : "http://localhost:3001",
    withCredentials : true
})

export default API;

export const randomTime = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1) + start)
}