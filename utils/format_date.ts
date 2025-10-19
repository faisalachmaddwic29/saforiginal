export function formatDate(date: Date | string): {
  dd_mm_yyyy: string,
  yyyy_mm_dd: string,
  month_short_date: string,
  dd_mm_yyyy_with_time: string,
  full_date_time_wib: string;
  full_date: string;
  time_wib: string;
  time_only: string;
  full_long_date_time: string;
  full_day_long_date_time: string;
  time_seconds: string
} {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const dd_mm_yyyy = `${day}/${month}/${year}`;
  const yyyy_mm_dd = `${year}-${month}-${day}`;

  // Get the abbreviated month name
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthLongNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayNames = [
    "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
  ];
  const monthShort = monthNames[date.getMonth()];
  const monthLong = monthLongNames[date.getMonth()];
  const dayName = dayNames[date.getDay()];


  const month_short_date = `${monthShort} (${day})`;

  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const dd_mm_yyyy_with_time = `${dd_mm_yyyy} ${hour}:${minute}:${seconds}`



  // Tambahan sesuai contoh gambar
  const full_date_time_wib = `${day} ${monthLong} ${year} | ${hour}.${minute} WIB`;
  const full_date = `${day} ${monthLong} ${year}`;
  const time_wib = `${hour}.${minute} WIB`;
  const time_only = `${hour}:${minute}`;
  const full_long_date_time = `${day} ${monthLong} ${year} | ${hour}:${minute}`;
  const time_seconds = `${hour}:${minute}:${seconds}`;
  const full_day_long_date_time = `${dayName}, ${day} ${monthLong} ${year} | ${hour}:${minute}`;

  return {
    dd_mm_yyyy,
    yyyy_mm_dd,
    month_short_date,
    dd_mm_yyyy_with_time,
    full_date_time_wib,
    full_date,
    time_wib,
    time_only,
    full_long_date_time,
    full_day_long_date_time,
    time_seconds
  };
}
