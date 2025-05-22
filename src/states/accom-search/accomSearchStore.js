// 숙박업소 검색창 전역 상태관리
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';
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

/**
 * checkInDate : 오늘 날짜
 * checkOutDate : 내일 날짜
 */
let now = new Date();

let checkInDate = new Date();
let checkOutDate = new Date(now.setDate(now.getDate() + 1));

// YYYY-MM-DD 형식으로 변환 -> 10보다 아래일 경우 0 붙이기
// checkInDate =
//   checkInDate.getFullYear() +
//   '.' +
//   (checkInDate.getMonth() < 9 ? '0' + (checkInDate.getMonth() + 1) : checkInDate.getMonth() + 1) +
//   '.' +
//   (checkInDate.getDate() < 9 ? '0' + checkInDate.getDate() : checkInDate.getDate()) +
//   ' (' +
//   dayHandler(checkInDate.getDay()) +
//   ')';

// checkOutDate =
//   checkOutDate.getFullYear() +
//   '.' +
//   (checkOutDate.getMonth() < 9 ? '0' + (checkOutDate.getMonth() + 1) : checkOutDate.getMonth() + 1) +
//   '.' +
//   (checkOutDate.getDate() < 9 ? '0' + checkOutDate.getDate() : checkOutDate.getDate()) +
//   ' (' +
//   dayHandler(checkOutDate.getDay()) +
//   ')';
const formatDate = (date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${dayHandler(date.getDay())})`;

// 초기 상태
const initialState = {
  keyword: '',
  checkIn: formatDate(checkInDate),
  checkOut: formatDate(checkOutDate),
  tripDay: 1,
  numberOfPeople: 1,
};

// export const useAccomSearchStore = create((set, get) => {
//   return {
//     ...initialState,
//     actions: {
//       setKeywordState: (value) => set({ keyword: value }),
//       setCheckInState: (date) => set({ checkIn: date }),
//       setCheckOutState: (date) => set({ checkOut: date }),
//       setTripDayState: (day) => set({ tripDay: day }),
//       setNumberOfPeople: (count) => set({ numberOfPeople: count }),
//       resetState: () => set(initialState),
//     },
//   };
// });

// export const useAccomSearchStore = create(
//   persist(
//     combine(initialState, (set) => ({
//       setKeywordState: (value) => set({ keyword: value }),
//       setCheckInState: (date) => set({ checkIn: date }),
//       setCheckOutState: (date) => set({ checkOut: date }),
//       setTripDayState: (day) => set({ tripDay: day }),
//       setNumberOfPeople: (count) => set({ numberOfPeople: count }),
//       resetState: () => set({ ...initialState }),
//     })),
//     {
//       name: 'accomSearchStore',
//       storage: localStorage,
//     }
//   )
// );
export const useAccomSearchStore = create(
  persist(
    (set, get) => ({
      initialState,

      setKeywordState: (value) => set({ keyword: value }),
      setCheckInState: (date) => set({ checkIn: date }),
      setCheckOutState: (date) => set({ checkOut: date }),
      setTripDayState: (day) => set({ tripDay: day }),
      setNumberOfPeople: (count) => set({ numberOfPeople: count }),

      resetState: () => set(initialState),
    }),
    {
      name: 'accomSearchStore', // 필수 값
      getStorage: () => localStorage, // 로컬 스토리지에 자동저장 (기본값이라 생략 가능)
      partialize: (state) => ({
        keyword: state.keyword,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        tripDay: state.tripDay,
        numberOfPeople: state.numberOfPeople,
      }),
    }
  )
);
/**
 * 모든 상태를 스토리지에 저장하지 않고 원하는 상태만 저장하려면,
 * partialize 옵션을 사용해 저장할 상태만 포함하는 객체를 반환
 *
 * 팩토리 함수이므로 저장 시 상태를 가공할 수 있지만,
 * 리하이드레이션(Rehydration) 전까지는 현재 상태(currentState)와
 * 스토리지 상태(persistedState)가 다를 수 있음
 */

/** onRehydrateStorage
 * 스토리지가 하이드레이션(Hydration)되면 실행되는 함수
 *
 * ** Zustand에서 하이드레이션(Hydration)은
 *        스토리지에 저장된 상태를 현재 상태와 병합하는 프로세스를 말함
 *
 * 스토리지 상태를 현재 상태로 병합
 */
