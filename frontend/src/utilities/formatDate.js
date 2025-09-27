export default function formatDate(rawDate) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(rawDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const newDate = `${month} ${day}`;
  return newDate;
}
