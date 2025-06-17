import { create } from 'zustand';

const initialState = {
  id: null,
  category: null,
  roomNo: 0,
  message: '',
};

const ChatStateStore = create((set) => ({
  setId: (text) =>
    set({
      id: text,
    }),
  setRoomNo: (roomNo) =>
    set({
      roomNo,
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
