export const fetchAuthKratos = async (path: string, options = {}) => {
    const baseURL = "/auth-api";

    const response = await useFetch(path, {
        watch: false,
        baseURL: baseURL,
        ...options,
        headers: {
            Accept: "application/json",
        },
    });

    return response;
};
