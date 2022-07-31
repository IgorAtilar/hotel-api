export type Telephone = {
    id: string;
    number: string;
    country_code: string;
    area_code: string;
    is_landline: boolean;
    client_id: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
};

export type TelephoneInput = {
    number: string;
    area_code: string;
    is_landline: boolean;
    client_id: string | null;
};
