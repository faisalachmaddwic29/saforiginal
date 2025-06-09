const initialName = (name: string) => {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

export default initialName;

