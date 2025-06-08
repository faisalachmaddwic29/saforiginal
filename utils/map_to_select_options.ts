interface OriginalItem {
    code: string;
    name: string;
}

interface ResponseItem {
    id: string;
    name: string;
}

export const mapToSelectOption = (input: ResponseItem[]): OriginalItem[] => {
    return input.map(item => {
        const newItem: OriginalItem = {
            code: item.id,
            name: item.name,
        };
        return newItem;
    });
}
