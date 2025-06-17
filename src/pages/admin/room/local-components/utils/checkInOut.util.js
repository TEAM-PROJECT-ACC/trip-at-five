// 시간 값을 분 단위로 변환
const timeChangeMinute = (timeStr) => {
  const hours = timeStr.split(':').map(Number);
  return hours;
};

// 체크인/아웃 시간 설정
const setTimeFunc = (baseDate, checkTime) => {
  const [checkHour, checkMin] = timeChangeMinute(checkTime);
  const date = new Date(baseDate);
  date.setHours(checkHour, checkMin, 0, 0);
  return date;
};

export const diffHoursFunc = (checkIn, checkOut) => {
  const today = new Date();
  let checkInDate = setTimeFunc(today, checkIn);
  let checkOutDate = setTimeFunc(today, checkOut);

  if (checkOutDate <= checkInDate) {
    checkOutDate.setDate(checkOutDate.getDate() + 1);
  }

  // 시간 차이 계산
  const diffMs = checkOutDate - checkInDate;

  return diffMs / (1000 * 60 * 60);
};
