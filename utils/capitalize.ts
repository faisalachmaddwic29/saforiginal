export const capitalize = (string: String) => {
    let text = string.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
};
