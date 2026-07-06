const koreaTimeZone = 'Asia/Seoul';

export function formatKoreaDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
) {
  return date.toLocaleDateString('en-US', {
    timeZone: koreaTimeZone,
    ...options
  });
}
