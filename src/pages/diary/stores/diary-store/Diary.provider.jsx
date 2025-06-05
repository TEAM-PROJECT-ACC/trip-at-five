import { useState } from 'react';
import { createDiaryStore } from './diary.store';
import { DiaryStoreContext } from './diary.context';

export const DiaryProvider = ({ children, initialDiary }) => {
  const [store] = useState(() => createDiaryStore(initialDiary));

  return (
    <DiaryStoreContext.Provider value={store}>
      {children}
    </DiaryStoreContext.Provider>
  );
};
