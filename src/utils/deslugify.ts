export const deslugify = (value: string) => {
  const words = value.match(/[A-Za-z][a-z]*/g) || [];
  return words.map(capitalize).join(" ");
};

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.substring(1);
