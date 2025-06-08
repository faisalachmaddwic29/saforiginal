export const isAbleTo = (string: String) => {
    const permission = usePermission();
    return permission.isAbleTo(string);
};
