// src/api/toursApi.js
import axios from "axios";

const API = "http://localhost:5050/tours";

export const getTours = (params = {}) => {
  return axios.get(API, { params });
};

export const getTourById = (id) => {
  return axios.get(`${API}/${id}`);
};
