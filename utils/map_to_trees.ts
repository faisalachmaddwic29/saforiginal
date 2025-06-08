interface OriginalItem {
    key: string;
    label: string;
    data: ResponseItem;
    // icon: string;
    // type: string;
    // expandedIcon: boolean;
    // collapsedIcon: boolean;
    loading: boolean;
    leaf: boolean;
    children?: OriginalItem[];
    checked?: boolean;
    partialChecked?: boolean;
}

interface ResponseItem {
    id: string;
    name: string;
    alias: string;
    path: string;
    level: string;
    // data: string;
    icon: string;
    loading: boolean;
    leaf: boolean;
    children?: ResponseItem[];
    checked?: boolean;
}

export const  mapToTrees =(input: any): OriginalItem[] => {
    return input.map((item:any) => {
        const newItem: OriginalItem = {
            key: item.id,
            label: item.name,
            leaf: item.leaf,
            loading: true,
            data: item,
            children: item.children ? mapToTrees(item.children) : undefined,
            checked:item.checked
            // expandedIcon: true,
            // collapsedIcon: true,
            // collapsedIcon: 'mdi mdi-plus-circle-outline',
            // icon: 'pi pi-fw pi-inbox',
        };

        return newItem;
    });
}
