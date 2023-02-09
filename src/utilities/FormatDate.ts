export const FormatDate = (date:Date) :string => {
  return `${date.toString().slice(8, 10)}/${date.toString().slice(5, 7)}/${date.toString().slice(0, 4)}`;
};
