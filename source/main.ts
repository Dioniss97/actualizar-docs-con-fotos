// Imports existentes
import { getImageBase64 } from "./integrations/user_generator/integration";
import { DotenvIntegrationHandler as Dotenv } from "./integrations/dotenv/integration";
import { GladtolinkIntegrationHandler as Gladtolink } from "./integrations/gladtolink/integration";
import fs from 'fs';
import csv from 'csv-parser';

// Función para leer las IDs del CSV y actualizar los documentos
function updateDocumentsWithImage() {
    const documentIds: string[] = []; // Almacenar las IDs aquí

    fs.createReadStream('../data/document_ids.csv')
      .pipe(csv())
      .on('data', (row) => documentIds.push(row.id))
      .on('end', async () => {
        const gladtolink = new Gladtolink(<string>Dotenv.get("GLADTOLINK_URL"), <string>Dotenv.get("GLADTOLINK_INTEGRATION_TOKEN"));
        for (const id of documentIds) {
            try {
                const image = await getImageBase64("https://thispersondoesnotexist.com/");
                await gladtolink.callGenerateDocumentAPI(id, image);
                console.log(`Documento ${id} actualizado`);
            } catch (err) {
                console.error(`Error al actualizar documento ${id}:`, err);
            }
        }
    });
}

updateDocumentsWithImage();