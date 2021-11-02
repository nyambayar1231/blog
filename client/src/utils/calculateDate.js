export const calculateDate = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  Difference_In_Time = Difference_In_Time / 100 / 60;
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return [Difference_In_Time, Difference_In_Days];
};
