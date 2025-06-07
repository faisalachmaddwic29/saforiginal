export const extractValuesWithSpecialHandling = (
    obj: any,
    text: string = ""
) => {
    const result: any = {}; // Copy obj to result

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Jika key adalah 'parent_id', asumsikan Anda ingin mengganti keseluruhan objek dengan nilai dari 'value'
            if (
                key === text &&
                typeof obj[key] === "object" &&
                obj[key] !== null
            ) {
                // Mengambil nilai dari 'value' jika tersedia, jika tidak tersedia gunakan null
                // console.log(obj[key]);

                result[key] = Object.keys(obj[key])
                    ? parseInt(Object.keys(obj[key])[0])
                    : null;
            } else {
                // Untuk properti lain, salin nilai seperti biasa
                result[key] = obj[key];
            }
        }
    }
    return result;
};
