export const deleteFalsyProperties = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (!obj[key]) {
            delete obj[key];
        }
    });
};
