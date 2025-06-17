import { useState } from 'react';

export const APP_THEME_OPTIONS = [
  { label: '여행다섯시', value: 'app' },
  { label: '봄', value: 'spring' },
  { label: '여름', value: 'summer' },
  { label: '가을', value: 'autumn' },
  { label: '겨울', value: 'winter' },
];

export const useAppTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    () => APP_THEME_OPTIONS[0]
  );

  const onSelectTheme = (option) => {
    setSelectedTheme(() => option);
  };

  return {
    selectedTheme,
    onSelectTheme,
  };
};
