export const exceptEmptyValue = (data:object) => {
    const newData:any = {};
    for (let [key, value] of Object.entries(data)) {
        if(value == ''){
            value = null
        }
        if(value !== undefined){
            if(typeof value === 'object' && Array.isArray(value)){
                newData[key] = value.map((item) => item.id);
            }else{
                newData[key] = value;
            }
        }
    }
    return newData;
};
