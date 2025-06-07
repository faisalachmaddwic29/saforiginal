interface OriginalItem {
    key: string | number;
    label: string;
    data: any;
    children?: OriginalItem[];
    icon?: string;
}

const modifyDataKeys = (data: any): any => {
    if (!data || typeof data !== "object") {
        return data;
    }

    const modifiedData: any = {};

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            // Ganti 'id' menjadi 'test' dalam properti data
            modifiedData[key === "id" ? "key" : key] = modifyDataKeys(
                data[key]
            );
        }
    }

    return modifiedData;
};

const modifyChildrenKeys: any = (children: any) => {
    if (!children || !Array.isArray(children)) {
        return null;
    }

    return children.map((child) => {
        const modifiedChild = {
            key: child.id,
            label: child.text,
            data: modifyDataKeys(child),
            children: modifyChildrenKeys(child.children),
            icon: child?.icon ?? "",

            // Add or modify properties here
        };

        return modifiedChild;
    });
};

export const mapToTreesChildren = (input: any): OriginalItem[] => {
    return input.map((item: any) => {
        const modifiedChildren = modifyChildrenKeys(item.children);

        const newItem: OriginalItem = {
            key: item.id,
            label: item.text,
            data: modifyDataKeys(item),
            children: modifiedChildren,
            icon: item?.icon ?? "",
        };

        return newItem;
    });
};
