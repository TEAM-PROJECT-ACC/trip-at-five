export const BOOK_STATE = {
  completed: 'COMPLETED',
  processing: 'PROCESSING',
  cancel: 'CANCEL',
};

export const getBookStateClass = (state) => {
  switch (state) {
    case BOOK_STATE.completed:
      return 'neutral';
    case BOOK_STATE.processing:
      return 'secondary';
    default:
      return 'danger';
  }
};

export const getBookStateText = (state) => {
  switch (state) {
    case BOOK_STATE.completed:
      return '예약 완료';
    case BOOK_STATE.processing:
      return '처리중';
    default:
      return '예약 취소';
  }
};
