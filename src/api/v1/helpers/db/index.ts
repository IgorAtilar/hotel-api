export const createUpdateQuery = (
    table: string,
    body: { [key: string]: any }
) => {
    const collumnsValues = getValuesArray(body);
    const idPosition = collumnsValues.length + 1;
    const updated_at = new Date().toISOString();
    const query = [`UPDATE ${table} SET updated_at = '${updated_at}', `];
    const set = [];
    Object.keys(body).forEach((key, i) => {
        set.push(`${key} = $${i + 1}`);
    });
    query.push(set.join(", "));
    query.push(`WHERE id = $${idPosition};`);
    return query.join(" ");
};

export const createInsertQuery = (
    table: string,
    body: { [key: string]: any },
    id?: string
) => {
    if (id) {
        const query = [`insert into ${table} (id, `];

        const columns = [];
        const values = [];
        Object.keys(body).forEach((key, i) => {
            columns.push(key);
            values.push(`$${i + 1}`);
        });
        query.push(columns.join(", "));
        query.push(`) values ('${id}',`);
        query.push(values.join(", "));
        query.push(")");

        return query.join(" ");
    }

    const query = [`insert into ${table} (`];

    const columns = [];

    const values = [];

    Object.keys(body).forEach((key, i) => {
        columns.push(key);
        values.push(`$${i + 1}`);

        if (i === Object.keys(body).length - 1) {
            query.push(columns.join(", "));
            query.push(") values (");
            query.push(values.join(", "));
            query.push(")");
        }
    });

    return query.join(" ");
};

export const getValuesArray = (body: { [key: string]: any }) => {
    return Object.keys(body).map((key) => body[key]);
};
