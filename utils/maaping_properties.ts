export const mapping_properties = (items: any, compareItems: any): any => {
    const mappedItems: any = [];

    // Lakukan iterasi terhadap setiap item dalam array items
    items.forEach((item: any) => {
        const { index, label } = item;

        // Cari item dengan indeks yang sama di data pertama
        const matchingItem = compareItems?.find(
            (data: any) => data.index === index
        );

        // Jika item ditemukan, tambahkan ke objek hasil pemetaan
        if (matchingItem) {
            // mappedItems[index] = matchingItem;
            mappedItems.push({
                label: label,
                type: matchingItem.type,
                value: matchingItem.value,
            });
        }
    });

    return mappedItems;
};
