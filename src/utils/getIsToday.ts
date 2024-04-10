interface Params {
  date: string;
}
export const getIsToday = ({ date }: Params) => {
  const todayDate = new Date();
  const targetDate = new Date(date);
  return (
    todayDate.getFullYear() === targetDate.getFullYear() &&
    todayDate.getMonth() === targetDate.getMonth() &&
    todayDate.getDate() === targetDate.getDate()
  );
};
