export const fetchApi = async (path: string, options = {}) => {
    const baseURL = "/qifess/api/v1/";
    const profileStore = useProfile();

    const response = await useFetch(path, {
        watch: false,
        baseURL: baseURL,
        ...options,
        headers: {
            Accept: "application/json",
        },
    });

    if (response.error.value) {
        if (response.error.value.statusCode === 401) {
            profileStore.clearAll();
            return navigateTo("/auth/login");
        }
    }

    return response;
};
