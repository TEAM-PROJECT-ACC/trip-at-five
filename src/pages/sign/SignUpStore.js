import { create } from 'zustand';

const useSignUpStore = create((set) => ({
  isTrue: 'false' ,
  setIsTrue: (value) => set({ isTrue: value }),
  setIsFalse: (value) => set({ isTrue: value })
}));

export default useSignUpStore;
