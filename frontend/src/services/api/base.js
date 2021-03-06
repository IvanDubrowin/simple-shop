import axios from "axios"
import { BASE_API_URL } from "../../constants/api"

export const API = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    responseType: "json"
  })