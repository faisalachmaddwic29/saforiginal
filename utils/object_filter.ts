export const objectFilter = (data:object) => {
    return Object.entries(data)
        .filter(([key, { value }]) => value !== "")
        .filter(([key, { value }]) => value !== null)
        .filter(([key, { value }]) => value !== undefined)
        .map(([key, { value, matchMode }]) => `${key}:${matchMode}:${value}`)
        .join("|");
};
