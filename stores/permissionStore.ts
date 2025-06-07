export const usePermission = defineStore("permission", () => {
    const { isMobile } = useDevice()
    const toast = useToast();
    const permissions = ref([]);
    const permissionsRaw = ref([]);
    const loadPermission = async () => {
        const { data, error } = await fetchApi("permissions", {
            method: "GET",
            query: {
                limit: -1,
            },
        });

        if (data.value?.data) {
            permissionsRaw.value = data.value.data;
            permissionsRaw.value.forEach((item: any) => {
                if (item.device == 0) {//all device
                    permissions.value.push(item.route);
                } else if (item.device == 2 && !isMobile) {//desktop
                    permissions.value.push(item.route);
                } else if (item.device == 1 && isMobile) {//mobile
                    permissions.value.push(item.route);
                }
            })

        }

        if (error.value) {
            toast.add({
                severity: "warn",
                summary: error?.value.data.error.status,
                detail: error?.value.data.error.message,
                life: 5000,
            });
        }
    };

    const isAbleTo = (route: string) => {
        return permissions.value.includes(route);
    };

    return { permissions, permissionsRaw, loadPermission,isAbleTo };
});
