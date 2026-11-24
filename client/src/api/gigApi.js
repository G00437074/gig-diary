import axios from 'axios';

const gigServer = axios.create({
  baseURL: 'http://localhost:4000/api/gigs'
});

export const fetchAllGigs = async () => {
  const response = await gigServer.get('');
  return response.data;
};

export const fetchGigById = async (gigId) => {
  const response = await gigServer.get(`/${gigId}`);
  return response.data;
};

export const createGig = async (gigDetails) => {
  const response = await gigServer.post('', gigDetails);
  return response.data;
};

export const updateGig = async (gigId, gigDetails) => {
  const response = await gigServer.put(`/${gigId}`, gigDetails);
  return response.data;
};

export const deleteGig = async (gigId) => {
  const response = await gigServer.delete(`/${gigId}`);
  return response.data;
};
