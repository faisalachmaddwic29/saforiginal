export const getDocLayout = (data?: any) => {
    if (data=='default') {
        return 'Default';
    }else if (data=='edc_verifone') {
        return 'Verifone EDC';
    }  else {
        return '-';
    }
};
