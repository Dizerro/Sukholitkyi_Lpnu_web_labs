import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/tours",
});

export const getTours = (params = {}) => {
  return api.get("/", { params });
};

export const getTourById = (id) => {
  return api.get(`/${id}`);
};
