export const useLoading = defineStore("loading-form", () => {
    const isLoading = ref(false);

    const toggle = () => {
        isLoading.value = !isLoading.value;
    };

    const stop = () => {
        isLoading.value = false;
    };
    return { isLoading, toggle, stop };
});
