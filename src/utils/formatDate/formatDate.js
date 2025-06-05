import { DATE_FORMAT } from './constants/dateFormat.constant';

const { FULL_KR, SLASH_DATE, DOT_DATE } = DATE_FORMAT;

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

export const getDatePad = (date, padsCount = 2, pad = '0') => {
  return String(date).padStart(padsCount, pad);
};

export const getFullDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return {
      year: '0000',
      month: '00',
      date: '00',
    };
  }
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = getDatePad(dateObj.getMonth() + 1);
  const date = getDatePad(dateObj.getDate());

  return {
    year,
    month,
    date,
  };
};

export const getFormattedDate = (dateString, format = SLASH_DATE) => {
  const { year, month, date } = getFullDate(dateString);

  if (format === SLASH_DATE) {
    return `${year}/${month}/${date}`;
  }

  if (format === FULL_KR) {
    return `${year}년 ${month}월 ${date}일`;
  }

  if (format === DOT_DATE) {
    return `${year}.${month}.${date}`;
  }
};
