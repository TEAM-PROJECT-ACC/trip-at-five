import { create } from 'zustand';

const initialState = {
  id: null,
  category: null,
  message: '',
};

const ChatStateStore = create((set) => ({
  setId: (text) =>
    set({
      id: text,
    }),

  setMessage: (text) =>
    set({
      message: text,
    }),
  setCategory: (category) => {
    set({
      category,
    });
  },
  reset: () => set(() => ({ ...initialState })),
}));

export default ChatStateStore;
