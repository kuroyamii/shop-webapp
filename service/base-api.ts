import axios, { CreateAxiosDefaults } from "axios";

export const BaseAPI = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
