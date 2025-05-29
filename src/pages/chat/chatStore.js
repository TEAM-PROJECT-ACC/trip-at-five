import { create } from 'zustand';

const initialState = {
  id: null,
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

  reset: () => set(() => ({ ...initialState })),
}));

export default ChatStateStore;
