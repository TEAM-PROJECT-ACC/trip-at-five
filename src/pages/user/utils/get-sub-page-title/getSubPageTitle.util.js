export const getSubPageTitle = (subPath) => {
  if (!subPath) {
    return;
  }
  switch (subPath) {
    case 'info':
      return '회원 정보';
    case 'coupon':
      return '내 쿠폰';
    case 'book-history':
      return '예약 내역';
    case 'challenge':
      return '챌린지';
    default:
      return '마이페이지';
  }
};
