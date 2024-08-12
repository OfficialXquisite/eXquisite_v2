import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

export const fetchSongs = (query) => {
  return axios.get(`${API_BASE_URL}/search?query=${query}`);
};

// Add other API utility functions here
