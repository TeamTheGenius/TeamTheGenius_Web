interface Params {
  date: string;
}
export const getSlashDate = ({ date }: Params) => {
  const originalDate = new Date(date);
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();
  const slashedDate = `${month}/${day}`;
  return slashedDate;
};
