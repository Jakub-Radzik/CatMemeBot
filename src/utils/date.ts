export function getTodayAndTomorrow(): [string, string] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getOrdinal = (n: number): string => {
    const j = n % 10,
      k = n % 100;
    if (j === 1 && k !== 11) return n + "st";
    if (j === 2 && k !== 12) return n + "nd";
    if (j === 3 && k !== 13) return n + "rd";
    return n + "th";
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) =>
    `${months[date.getMonth()]} ${getOrdinal(date.getDate())}`;

  return [formatDate(today), formatDate(tomorrow)];
}
