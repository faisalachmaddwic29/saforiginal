export const capitalize = (string: string) => {
    const text = string.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
};
