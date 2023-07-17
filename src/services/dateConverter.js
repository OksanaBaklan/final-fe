export default function dateConverter(d) {
  const date = new Date(d);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const fullYear = String(date.getFullYear());
  const shortYear = String(fullYear.slice(2, 4));

  const month = String(months[date.getMonth()]);
  const day = date.getDate();

  const fullDate = `${day}.${month}.${shortYear}`;
  return fullDate;
}
