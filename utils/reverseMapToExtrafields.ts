import { v4 as uuidv4 } from 'uuid';
export const reverseMapToExtrafields = (data: any) => {
    const result: any = [];
    data.forEach((group: any) => {
        group.items.forEach((item: any) => {
            const newItem: any = { id: uuidv4(), group: group.label };
            for (const [key, value] of Object.entries(item)) {
                newItem[key] = value;
            }
            result.push(newItem);
        });
    });
    return result;
};
