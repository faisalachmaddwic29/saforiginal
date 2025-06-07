import moment from "moment";

export const date_only = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
    });
    const [{ value: da }, , { value: month }, , { value: year }] =
        dtf.formatToParts(d);
    // return `${da}-${month}-${year} ${hour}:${minute}:${second}`;
    return `${da}-${month}-${year}`;
};

export const date_only_time = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${da}-${month}-${year} ${hour}:${minute}:${second}`;
};

export const date_time_format_api = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${year}-${month}-${da} ${hour}:${minute}:${second}`;
};

export const date_format_api = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${year}-${month}-${da}`;
};

export const date_time_format_api_without_second = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${year}/${month}/${da} ${hour}:${minute}`;
};

export const date_time_format_api_for_calender = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${da}/${month}/${year} ${hour}:${minute}`;
};

export const date_time_format_api_calender = (date: string) => {
    // Extract the date and time parts from the input string
    const [datePart, timePart] = date.split(" ");

    // Extract day, month, and year from the date part
    const [day, month, year] = datePart.split("/");

    // Extract hour and minute from the time part
    const [hour, minute] = timePart.split(":");

    // Create a new Date object
    const d = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
    );

    // Check if the Date object is valid
    if (isNaN(d.getTime())) {
        throw new Error("Invalid date");
    }

    // Format the date components to ensure two-digit format
    const formattedDate = `${d.getFullYear()}-${String(
        d.getMonth() + 1
    ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(d.getHours()).padStart(2, "0")}:${String(
        d.getMinutes()
    ).padStart(2, "0")}:00`;

    // Return the formatted date and time string
    return `${formattedDate} ${formattedTime}`;
};

export const date_time_without_year = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${month} ${da}, ${hour}:${minute}`;
};

export const date_time_mobile_ticketing = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [
        { value: day },
        ,
        { value: da },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = dtf.formatToParts(d);
    return `${da} ${month} ${year}, ${hour}:${minute}`;
};

export const date_time_format_api_to_fe = (date: string) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const [{ value: da }, { value: month }, { value: year }] =
        dtf.formatToParts(d);
    return `${year}/${month}/${da}`;
};

export const date_only_garing = (isoString: string) => {
    let date = new Date(isoString);

    // Use Intl.DateTimeFormat to format the date
    let formattedDate = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);

    return formattedDate;
};

export const timeSince = (date: string) => {
    const givenDate = moment(date);
    const currentDate = moment();

    const yearsDiff = currentDate.diff(givenDate, "years");
    givenDate.add(yearsDiff, "years");

    const monthsDiff = currentDate.diff(givenDate, "months");
    givenDate.add(monthsDiff, "months");

    const daysDiff = currentDate.diff(givenDate, "days");
    givenDate.add(daysDiff, "days");

    const hoursDiff = currentDate.diff(givenDate, "hours");
    givenDate.add(hoursDiff, "hours");

    const minutesDiff = currentDate.diff(givenDate, "minutes");

    let timeAgo = "";

    if (yearsDiff > 0) {
        timeAgo += `${yearsDiff} year${yearsDiff > 1 ? "s" : ""}`;
    }
    if (monthsDiff > 0) {
        if (timeAgo) timeAgo += ", ";
        timeAgo += `${monthsDiff} month${monthsDiff > 1 ? "s" : ""}`;
    }
    if (daysDiff > 0) {
        if (timeAgo) timeAgo += ", ";
        timeAgo += `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
    }
    if (hoursDiff > 0) {
        if (timeAgo) timeAgo += ", ";
        timeAgo += `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""}`;
    }
    if (minutesDiff % 60 > 0) {
        if (timeAgo) timeAgo += ", ";
        timeAgo += `${minutesDiff % 60} minute${
            minutesDiff % 60 > 1 ? "s" : ""
        }`;
    }

    return timeAgo + " ago";
};


export const formatDateToStringUtc = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}