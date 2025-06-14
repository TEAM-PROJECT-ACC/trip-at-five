import { apiAxios } from '../../../../services/service';

export const selectReservationList = async ({
  currentPage = 1,
  numOfRows = 10,
}) => {
  const response = await apiAxios.get(`/admin/reservations`, {
    params: { currentPage, numOfRows },
  });
  return response;
};
