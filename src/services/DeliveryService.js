import axios from "axios";

export const REST_API_BASE_URL = "http://localhost:8080/api/deliveries";

export const listDeliveries = () => axios.get(REST_API_BASE_URL);

export const createDelivery = (delivery) =>
  axios.post(REST_API_BASE_URL, delivery);

export const getDelivery = (deliveryId) =>
  axios.get(REST_API_BASE_URL + "/" + deliveryId);

export const updateDelivery = (deliveryId, delivery) =>
  axios.put(REST_API_BASE_URL + "/" + deliveryId, delivery);

export const deleteDelivery = (deliveryId) =>
  axios.delete(REST_API_BASE_URL + "/" + deliveryId);
