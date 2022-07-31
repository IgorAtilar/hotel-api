export type Room = {
    id: string;
    number: string;
    room_type: string;
    status: string;
    daily_price: number;
    created_at: string;
    updated_at: string;
    is_active: boolean;
};

export type CreateRoomInput = {
    number: string;
    room_type_id: string;
    room_status_id: string;
};

export type UpdateRoomInput = {
    id: string;
    number?: string;
    room_type_id?: string;
    room_status_id?: string;
};
