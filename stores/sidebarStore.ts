export const useSidebar = defineStore("sidebar", () => {
    const isSidebar = ref(false);
    const isMobile = ref(false);
    const title = ref('');

    const toggle = () => {
        isSidebar.value = !isSidebar.value;
    };

    const toggleMobile = () => {
        isMobile.value = !isMobile.value;
    };

    const dismissMobile = () => {
        isMobile.value = false;
    };

    const setTitle = (value: string) => {
        title.value = value;
    };

    return { title, isSidebar, toggle, setTitle, toggleMobile, isMobile, dismissMobile };
});
