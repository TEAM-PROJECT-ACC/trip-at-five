export const formatDate = (date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(date.getDate()).padStart(2, '0')} (${dayHandler(date.getDay())})`;

const dayHandler = (day) => {
  switch (day) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      return '';
  }
};

export const formatDateForApi = (dateString) => {
  if (!dateString) return '';
  const regex = /^(\d{4})\.(\d{2})\.(\d{2})/;
  const match = dateString.match(regex);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return '';
};
