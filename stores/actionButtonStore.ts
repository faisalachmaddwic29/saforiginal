export const useActionButton = defineStore("actionButton", () => {
    const loadingStore = useLoading();
    const confirm = useConfirm();
    const toast = useToast();

    const process = (
        path: string,
        method: string,
        successMessage: string,
        ids: number[],
        callback: Function,
        body?: object
    ) => {
        confirm.require({
            group: "headless",
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
                loadingStore.toggle();
                const { data, error }: any = await fetchApi(path, {
                    method: method,
                    body: JSON.stringify({
                        ids: ids,
                        ...body,
                    }),
                });
                if (error.value) {
                    toast.add({
                        severity: "error",
                        summary: error?.value.data.error.status,
                        detail: error?.value.data.error.message,
                        life: 3000,
                    });
                } else {
                    toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: successMessage,
                        life: 3000,
                    });
                    callback(data);
                }
                loadingStore.toggle();
            },
        });
    };

    const processWithoutbody = (
        path: string,
        method: string,
        successMessage: string,
        callback: Function
    ) => {
        confirm.require({
            group: "headless",
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: async () => {
                loadingStore.toggle();
                const { data, error }: any = await fetchApi(path, {
                    method: method,
                });
                if (error.value) {
                    toast.add({
                        severity: "error",
                        summary: error?.value.data.error.status,
                        detail: error?.value.data.error.message,
                        life: 3000,
                    });
                } else {
                    toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: successMessage,
                        life: 3000,
                    });
                    callback(data);
                }
                loadingStore.toggle();
            },
        });
    };

    return { process, processWithoutbody };
});
