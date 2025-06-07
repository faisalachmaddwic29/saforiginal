export const mapToConfig = (data: any) => {
    const transform: any = {};
    data.forEach((item: any) => {
        transform[item.index] = item.value;
    });
    return transform;
};
