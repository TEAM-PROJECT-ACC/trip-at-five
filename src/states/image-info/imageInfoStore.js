import { create } from 'zustand';

const initialState = {
  images: [],
};

export const useDeleteImageInfoStore = create((set, get) => {
  return {
    ...initialState,
    setImages: (value) => set({ images: value }),
    resetImageInfoStore: () => set(initialState),
  };
});
