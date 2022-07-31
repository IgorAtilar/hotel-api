export type ClientBooking = {
    id: string;
    room: string;
    start_date: string;
    end_date: string;
};

export type ClientTelephone = {
    id: string;
    area_code: string;
    number: string;
    is_landline: boolean;
};

export type Client = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    address: string;
    birthdate?: string;
    wifi_password?: string;
    bookings: ClientBooking[];
    telephones: ClientTelephone[];
    created_at: string;
    updated_at: string;
    is_active: boolean;
};

export type CreateClientInput = {
    name: string;
    cpf: string;
    email: string;
    address?: string;
    birthdate?: string;
    wifi_password?: string;
};

export type UpdateClientInput = {
    id: string;
    name?: string;
    cpf: string;
    email: string;
    address: string;
    birthdate?: string;
    wifi_password?: string;
};
