export const generateRandomNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return random;
};