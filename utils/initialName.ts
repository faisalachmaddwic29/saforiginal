const initialName = (name: string) => {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};


const initialNameFirst = (name: string) => {
    return name
        .split(" ")
        .slice(0, 1)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

export { initialName, initialNameFirst };




