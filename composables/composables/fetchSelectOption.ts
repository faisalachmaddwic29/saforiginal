export const fetchSelectOption = async (path: string) => {
    const { data, pending, error, refresh } = await fetchApi(path,{
        method: 'GET',
        query: {
            limit: -1,
        }
    })
    if (data.value) {
        const rows = data.value.data.rows
        if(path=='roles'){
            localStorage.setItem(path, JSON.stringify(rows))
        }
        return mapToSelectOption(rows)
    }
};
