export class MissingIdError extends Error {
    constructor() {
        super("É necessário informar o id");
    }
}
