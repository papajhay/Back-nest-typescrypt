import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
    storage: diskStorage({
        destination: './uploads', // Répertoire où les fichiers seront stockés
        filename: (req, file, callback) => {
            const filename = `${Date.now()}${extname(file.originalname)}`;
            callback(null, filename);
        },
    }),
};