import { v4 as uuidv4 } from 'uuid';
export const reverseMapToConfig = (transform: any) => {
    const data : any = [];
    for (const index in transform) {
      data.push({id: uuidv4(), index: index, value: transform[index] });
    }
    return data;
};
