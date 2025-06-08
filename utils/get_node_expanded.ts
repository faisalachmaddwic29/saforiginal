export const getNodeExpanded = (data: MyObjectItem[], targetKey: number, newChildren: MyObjectItem[]): any   => {
    const cloneAndAddChildren = (items: MyObjectItem[]): MyObjectItem[] => {
        return items.map(item => {
            if (item.key === targetKey) {
                if (!item.children) {
                    return {
                        ...item,
                        children: [...newChildren],
                    };
                }
                return {
                    ...item,
                    children: [...item.children, ...newChildren],
                };
            } else if (item.children) {
                return {
                    ...item,
                    children: cloneAndAddChildren(item.children),
                };
            }
            return item;
        });
    };

    return cloneAndAddChildren(data);
}
type MyObjectItem = {
    key: number;
    label: string;
    loading: boolean;
    leaf: boolean;
    children?: MyObjectItem[];
};
