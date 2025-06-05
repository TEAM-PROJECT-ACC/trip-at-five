// 임시

import { create } from 'zustand';

const initialState = {
  type: '',
  images: [],
};

export const imageInfoStore = create((set, get) => {
  return {
    setType: (value) => set({ type: value }),
    setImages: (value) => set({ images: value }),
    resetImageInfoStore: () => set(initialState),
  };
});
