export class InvalidCredentialsError extends Error {
    constructor() {
        super("Token de acesso inválido ou expirado");
    }
}
