import axios from 'axios';
import { apiAxios } from '../service';

export const roomInsertAPI = async (roomData) => {
  const response = await apiAxios.post('/rooms', roomData);
};
