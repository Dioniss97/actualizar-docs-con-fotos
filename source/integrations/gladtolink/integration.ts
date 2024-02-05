// Imports //
import * as request from "request";
import { User } from "../user_generator/integration";
// Imports //

// Class //
export class GladtolinkIntegrationHandler {

    // Attributes //
    private url: string;
    private token: string;
    // Attributes //

    // Constructor //
    constructor(url: string, token: string) {
        this.url = url;
        this.token = token;
    }
    // Constructor //

    // Functions //
    async callGenerateDocumentAPI(documentUniqueId: string, image: string) {

        const data = `
        {
            "documentUniqueId": "${documentUniqueId}",
            "tags": [
                {
                "uniqueId": "cbba09ea-b2d6-4cce-8c34-415138285bb0",
                "name": "Usuario",
                "fields": [
                        {
                            "uniqueId": "a5e759a3-fdaa-42d2-bd27-865fb29066d6",
                            "name": "Imagen",
                            "value": "${image}"
                        }
                    ]
                }
            ]
        }
        `.replace(/\n/g, '').replace(/ +/g, " ").trim();

        let options = {
            method: "POST",
            url: `${this.url}:8080/api/G2LIntegration/${this.token}`,
            headers: {
                "Content-Type": "x-www-form-urlencoded"
            },
            form: { data: data }
        };

        request.post(options, (error, response, body) => {
            if (error) {
            } else {
                console.log(body);
            }
        });

    }
    // Functions //

}
// Class //