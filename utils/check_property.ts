export const checkProperty = <T extends keyof Field>(property: Property | undefined, index: string, propertyToCheck: T): boolean => {
    if (!property) {
        return false;
    }
    if(property?.fields){
        const field = property?.fields.find((f) => f.index === index);

        if (field && typeof field[propertyToCheck] === 'boolean') {
            return field[propertyToCheck] as boolean;
        }
    }
    return false;
};

type Field = {
    index: string;
    required: boolean;
    visible: boolean;
  };

type Property = {
fields: Field[];
};
