export const makeTitleName = (name: string) => {
    let datas = name.split(" ");
    let string = "";

    datas.forEach((data, index) => {
        if (index < 2) {
            string += data.charAt(0);
        }
    });
    return string;
};
