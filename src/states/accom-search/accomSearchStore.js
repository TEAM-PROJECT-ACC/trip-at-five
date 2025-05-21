// 숙박업소 검색창 전역 상태관리
import { create } from 'zustand';

/**
 * checkInDate : 오늘 날짜
 * checkOutDate : 내일 날짜
 */
let now = new Date();

let checkInDate = new Date();
let checkOutDate = new Date(now.setDate(now.getDate() + 1));

// YYYY-MM-DD 형식으로 변환 -> 10보다 아래일 경우 0 붙이기
checkInDate =
  checkInDate.getFullYear() +
  '.' +
  (checkInDate.getMonth() < 10 ? '0' + checkInDate.getMonth() : checkInDate.getMonth()) +
  '.' +
  (checkInDate.getDate() < 10 ? '0' + checkInDate.getDate() : checkInDate.getDate());

checkOutDate =
  checkOutDate.getFullYear() +
  '.' +
  (checkOutDate.getMonth() < 10 ? '0' + checkOutDate.getMonth() : checkOutDate.getMonth()) +
  '.' +
  (checkOutDate.getDate() < 10 ? '0' + checkOutDate.getDate() : checkOutDate.getDate());

// 초기 상태
const initialState = {
  keyword: '',
  checkIn: checkInDate,
  checkOut: checkOutDate,
  tripDay: 1,
  numberOfPeople: 1,
};

export const useAccomSearchStore = create((set, get) => {
  return {
    ...initialState,
    actions: {
      setKeywordState: (value) => set({ keyword: value }),
      setCheckInState: (date) => set({ checkIn: date }),
      setCheckOutState: (date) => set({ checkOut: date }),
      setTripDayState: (day) => set({ tripDay: day }),
      setNumberOfPeople: (count) => set({ numberOfPeople: count }),
      resetState: () => set(initialState),
    },
  };
});
