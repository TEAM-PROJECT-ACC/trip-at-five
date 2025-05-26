export const getDateLocaleString = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return '입력된 날짜가 없습니다';
  }
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  return `${year}년 ${month}월 ${date}일`;
};
