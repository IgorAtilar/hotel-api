import { createInsertQuery, getValuesArray } from "@/api/v1/helpers/db";
import { db } from "@/config/db";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { CREATE_TABLES_QUERY, DROP_TABLE_QUERY } from "./queries";

const createFakeData = async () => {
    try {
        const clients = [];
        for (let i = 0; i < 10; i++) {
            const client = {
                id: uuid(),
                cpf: faker.datatype.number({
                    min: 10000000000,
                    max: 99999999999,
                }),
                name: faker.name.firstName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(),
                birthdate: faker.date.past(),
                wifi_password: faker.random.word(),
            };
            clients.push(client);
        }
        const telephones = [];
        for (let i = 0; i < 10; i++) {
            const telephone = {
                id: uuid(),
                client_id: clients[i].id,
                area_code: "31",
                number: faker.phone.phoneNumber("#####-####"),
                is_landline: faker.datatype.boolean(),
            };
            telephones.push(telephone);
        }

        const types = ["normal", "premium", "luxo"];

        const room_types = types.map((type) => ({
            id: uuid(),
            name: type,
            daily_price: faker.datatype
                .number({ min: 100, max: 1000 })
                .toString(),
        }));

        const status = ["disponível", "ocupado", "reservado"];

        const room_status = status.map((status) => ({
            id: uuid(),
            name: status,
        }));

        const rooms = [];
        for (let i = 0; i < 10; i++) {
            const room = {
                id: uuid(),
                room_type_id:
                    room_types[faker.datatype.number({ min: 0, max: 2 })].id,
                room_status_id:
                    room_status[faker.datatype.number({ min: 0, max: 2 })].id,
                number: faker.datatype
                    .number({ min: 100, max: 1000 })
                    .toString(),
            };
            rooms.push(room);
        }

        const bookings = [];
        for (let i = 0; i < 10; i++) {
            const booking = {
                id: uuid(),
                client_id:
                    clients[faker.datatype.number({ min: 0, max: 9 })].id,
                room_id: rooms[faker.datatype.number({ min: 0, max: 9 })].id,
                start_date: faker.date.past(),
                end_date: faker.date.future(),
            };
            bookings.push(booking);
        }

        for await (const client of clients) {
            await db.query(
                createInsertQuery("clients", client),
                getValuesArray(client)
            );
        }

        for await (const telephone of telephones) {
            await db.query(
                createInsertQuery("telephones", telephone),
                getValuesArray(telephone)
            );
        }

        for await (const room_type of room_types) {
            await db.query(
                createInsertQuery("room_types", room_type),
                getValuesArray(room_type)
            );
        }

        for await (const status of room_status) {
            await db.query(
                createInsertQuery("room_status", status),
                getValuesArray(status)
            );
        }

        for await (const room of rooms) {
            await db.query(
                createInsertQuery("rooms", room),
                getValuesArray(room)
            );
        }

        for await (const booking of bookings) {
            await db.query(
                createInsertQuery("bookings", booking),
                getValuesArray(booking)
            );
        }

        console.log("Dados criados com sucesso! 🎉");
    } catch (error) {
        console.log(error);
    }
};

const createTables = async () => {
    try {
        db.connect();
    } catch (e) {
        console.log("Erro ao se conectar ao banco de dados 😢");
        console.log(e);
    }

    try {
        await db.query(DROP_TABLE_QUERY);
        await db.query(CREATE_TABLES_QUERY);
        await createFakeData();

        console.log("Tabelas criadas com sucesso! 🎉");
    } catch (e) {
        console.log("Erro ao criar tabelas 😢");
        console.log(e);
    }

    db.end();
    process.exit(0);
};

createTables();
