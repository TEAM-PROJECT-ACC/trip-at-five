export const validateEmail = (id) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
};

export const validatePhoneNumber = (tel) => {
  return /^01[0-9]\d{7,8}$/.test(tel);
};
