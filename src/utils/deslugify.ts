export const deslugify = (value: string) => {
  var words = value.match(/[A-Za-z][a-z]*/g) || [];
  return words.map(capitalize).join(" ");
};

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};
