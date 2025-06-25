import axios from 'axios';

const API_BASE = 'https://plant-care-server-nine.vercel.app/api/plants';

export const getAllPlants = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getPlantsByUser = async (email) => {
  const res = await axios.get(`${API_BASE}/user/${email}`);
  return res.data;
};

export const getPlantById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const createPlant = async (plant) => {
  const res = await axios.post(API_BASE, plant);
  return res.data;
};

export const updatePlant = async (id, plant) => {
  const res = await axios.put(`${API_BASE}/${id}`, plant);
  return res.data;
};

export const deletePlant = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
