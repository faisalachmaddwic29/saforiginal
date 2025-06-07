export const fetchTreeOption = async (path: string) => {
    const { data, pending, error, refresh } = await fetchApi(path,{
        method: 'GET',
        query: {
            limit: -1,
        }
    })
    if (data.value) {
        const rows = data.value.data
        return mapToTrees(rows)
    }
};
