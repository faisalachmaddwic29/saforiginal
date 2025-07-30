export const currency = (money: string | number | any) => {
    return new Intl.NumberFormat("id-ID").format(money);
};
