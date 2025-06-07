type Field = {
    index: string;
    required: boolean;
    visible: boolean;
};

type Property = {
    fields?: Field[];
    // Other properties as needed
};

type Role = {
    id: number;
    name: string;
    alias: string;
    home: number;
    color: string;
    description: string;
    mode_id: number;
    property?: Property;
// Other properties as needed
};

export const getRoleById = (id: number): Role | undefined => {
    const rolesString = localStorage.getItem('roles');
    if (!rolesString) {
        return undefined;
    }

    try {
        const roles: Role[] = JSON.parse(rolesString);
        return roles.find((role) => role.id === id);
    } catch (error) {
        console.error('Error parsing roles from localStorage:', error);
        return undefined;
    }
};
