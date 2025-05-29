import axios from 'axios';

export const showAccommodationList = async () => {
  const response = await axios.get('/accommodations');
  return response.data;
};
