import { create } from 'zustand';

const initialState = {
  resCode: '',
  resName: '',
  resEmail: '',
  resPhone: '',
  userCoupon: {},
  roomInfo: [],
  // 검색 상태에도 있는 정보
  checkIn: '',
  checkOut: '',
  numberOfPeople: 1,
  totalPrice: 0,
};

export const usePaymentInfoStore = create((set, get) => {
  return {
    ...initialState,
    actions: {
      setResCode: (value) => set({ resCode: value }),
      setResName: (value) => set({ resName: value }),
      setResEmail: (value) => set({ resEmail: value }),
      setResPhone: (value) => set({ resPhone: value }),
      setUserCoupon: (value) => set({ userCoupon: value }),
      setRoomInfo: (value) => set({ roomInfo: value }),
      setCheckIn: (value) => set({ checkIn: value }),
      setCheckOut: (value) => set({ checkOut: value }),
      setNumberOfPeople: (value) => set({ numberOfPeople: value }),
      setTotalPrice: (value) => set({ totalPrice: value }),
      resetState: () => set(initialState),
    },
  };
});
