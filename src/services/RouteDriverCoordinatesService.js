import axios from "axios";
export const REST_API_BASE_URL = "http://localhost:8080/api/routedriver/coordinates";

export const createRouteDriver = (csv) => axios.post(REST_API_BASE_URL, csv);
