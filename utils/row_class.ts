export const rowClass = (data: { deleted_at?: any }) => {
    if (data.deleted_at) {
        return ["opacity-50"];
    } else {
        return null;
    }
};
export const rowClass2 = (data: { delete_at?: any }) => {
    if (data.delete_at) {
        return ["opacity-50"];
    } else {
        return null;
    }
};
