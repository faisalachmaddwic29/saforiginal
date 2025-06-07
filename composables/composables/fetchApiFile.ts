export const fetchApiFile = async (path: string, options: any = {}) => {
    const baseURL = "/qifess/api/v1/";
    const profileStore = useProfile();

    const response = await fetch(`${baseURL}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            profileStore.clearAll();
            return navigateTo("/auth/login");
        }
    }

    return response;
};
