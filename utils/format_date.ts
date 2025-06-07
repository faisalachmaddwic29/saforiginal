export function formatDate(date: Date): { dd_mm_yyyy: string, yyyy_mm_dd: string, month_short_date: string , dd_mm_yyyy_with_time: string } {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const dd_mm_yyyy = `${day}/${month}/${year}`;
    const yyyy_mm_dd = `${year}-${month}-${day}`;

    // Get the abbreviated month name
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthShort = monthNames[date.getMonth()];

    const month_short_date = `${monthShort} (${day})`;

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const dd_mm_yyyy_with_time = `${dd_mm_yyyy} ${hour}:${minute}:${seconds}`

    return { dd_mm_yyyy, yyyy_mm_dd, month_short_date, dd_mm_yyyy_with_time };
}
