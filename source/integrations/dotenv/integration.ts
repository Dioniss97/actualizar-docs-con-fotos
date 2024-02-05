// Imports //
import dotenv from "dotenv";
// Imports //

// Class //
export class DotenvIntegrationHandler {
    static get(element: string) {
        dotenv.config();
        return process.env[element];
    }
}
// Class //