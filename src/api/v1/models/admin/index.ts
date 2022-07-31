export type Admin = {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export type UpdateAdminInput = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type CreateAdminInput = {
    name: string;
    email: string;
    password: string;
};
