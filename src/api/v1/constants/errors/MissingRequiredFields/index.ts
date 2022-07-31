export class MissingRequiredFieldsError extends Error {
    constructor(fields: string[]) {
        super(`O(s) campos ${fields.join(", ")} são obrigatórios`);
    }
}
