export const useProfile = defineStore("profile", () => {
    const { isMobile } = useDevice();
    const toast = useToast();
    const dataProfile = ref("");
    const isSuperadmin = ref(false);
    const setProfile = (data: any) => {
        if (process.client) {
            localStorage.setItem(QIFESS.PROFILE, JSON.stringify(data));
            dataProfile.value = data;
            isSuperadmin.value =
                dataProfile.value?.role_id == 1 ||
                dataProfile.value?.role_id == 10
                    ? true
                    : false;
        }
    };

    const getProfile = () => {
        if (process.client) {
            const profile = localStorage.getItem(QIFESS.PROFILE);
            if (profile) {
                dataProfile.value = JSON.parse(profile ?? "");
                isSuperadmin.value =
                    dataProfile.value?.role_id === 1 ||
                    dataProfile.value?.role_id === 10
                        ? true
                        : false;
                return JSON.parse(profile ?? "");
            }
            return null;
        }
        return null;
    };

    const setMenu = (data: any) => {
        if (process.client) {
            const filter = filteredMenu(data);
            localStorage.setItem(QIFESS.MENU, JSON.stringify(filter));
        }
    };

    const loadMenu = async () => {
        const { data, error }: any = await fetchApi("menu");
        let menu: MenuProps[] = [];

        if (data) {
            data.value.data.forEach((item: MenuProps) => {
                if (item.device == 0) {
                    //all device
                    menu.push(item);
                } else if (item.device == 2 && !isMobile) {
                    //desktop
                    menu.push(item);
                } else if (item.device == 1 && isMobile) {
                    //mobile
                    menu.push(item);
                }
            });
            setMenu(menu);
            return menu;
        }

        if (error) {
            toast.add({
                severity: "warn",
                summary: error?.value.data.error.status,
                detail: error?.value.data.error.message,
                life: 5000,
            });
        }
    };

    const filteredMenu = (data: any) => {
        return data.filter((item: any) => {
            // Check if item has children and recursively filter them
            if (item.children && item.children.length > 0) {
                item.children = filteredMenu(item.children); // Recursively filter children
            }
            if (isMobile) {
                //remove desktop
                return item.device !== 2;
            } else {
                //remove mobile
                return item.device !== 1;
            }
        });
    };

    const getMenu = () => {
        if (process.client) {
            const menus = localStorage.getItem(QIFESS.MENU);
            return JSON.parse(menus ?? "");
        }
        return null;
    };

    function findMenuByRoute(items:any,route:any) {
        for (let item of items) {
            if (item.route.includes(route)) {
                return item;
            }
            if (item.children && item.children.length > 0) {
                const found:any = findMenuByRoute(item.children, route);
                if (found) {
                    return found;
                }
            }
        }
        return null; // Return null if the item is not found
    }

    const setLogin = (data: any, time: any) => {
        const cookie = useCookie(QIFESS.ID, { expires: time });
        cookie.value = JSON.stringify(data);
    };

    const clearAll = () => {
        useCookie(QIFESS.ID).value = null;

        if (process.client) {
            localStorage.removeItem(QIFESS.MENU);
            localStorage.removeItem(QIFESS.PROFILE);
        }
    };

    onMounted(() => {
        getProfile();
    });

    return {
        setProfile,
        getProfile,
        dataProfile,
        setLogin,
        clearAll,
        setMenu,
        getMenu,
        isSuperadmin,
        loadMenu,
        findMenuByRoute
    };
});
