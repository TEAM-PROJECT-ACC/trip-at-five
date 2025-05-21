import { create } from 'zustand';

const initialState = {
  resCode: '',
  resName: '',
  resPhone: '',
  userCoupon: [],
  roomInfo: [],
  // 검색 상태에도 있는 정보
  checkIn: '',
  checkOut: '',
  numberOfPeople: 1,
};

export const usePaymentInfoStore = create((set, get) => {
  return {
    ...initialState,
    actions: {
      setResCode: (value) => set({ resCode: value }),
      setResName: (value) => set({ resName: value }),
      setResPhone: (value) => set({ resPhone: value }),
      setResCoupon: (value) => set({ userCoupon: value }),
      setRoomInfo: (value) => set({ roomInfo: value }),
      setCheckIn: (date) => set({ checkIn: date }),
      setCheckOut: (date) => set({ checkOut: date }),
      setNumberOfPeople: (value) => set({ numberOfPeople: value }),
    },
  };
});
