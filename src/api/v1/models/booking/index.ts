export type Booking = {
    id: string;
    client_name: string;
    client_email: string;
    client_cpf: string;
    room_number: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
};

export type CreateBookingInput = {
    client_id: string;
    room_id: string;
    start_date: string;
    end_date: string;
};

export type UpdateBookingInput = {
    id: string;
    client_id: string;
    room_id: string;
    start_date: string;
    end_date: string;
};
