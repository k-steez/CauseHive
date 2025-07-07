import api from './api';

export const uploadPhoto = async (photoData) => {
  try {
    const response = await api.post('/photos', photoData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPhotos = async () => {
  try {
    const response = await api.get('/photos');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPhotoById = async (id) => {
  try {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPhotosByUser = async (userId) => {
  try {
    const response = await api.get(`/photos/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchPhotos = async (query) => {
  try {
    const response = await api.get(`/photos/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
