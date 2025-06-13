export const imageToFile = async (imageURL, fileName) => {
  const blob = await imageToBlob(imageURL);

  if (!blob) return null;

  return new File([blob], fileName, { type: blob.type });
};

const imageToBlob = async (imageURL) => {
  try {
    const response = await fetch(imageURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.blob();
  } catch (error) {
    console.error('이미지 fetch 오류 :', error);
    return null;
  }
};
