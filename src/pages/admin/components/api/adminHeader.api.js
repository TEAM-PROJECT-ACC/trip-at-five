import { apiAxios } from '../../../../services';

export const isCancelCountAPI = async () => {
  const response = await apiAxios.get(`/admin/reservations/cancel-count`);
  return response;
};
