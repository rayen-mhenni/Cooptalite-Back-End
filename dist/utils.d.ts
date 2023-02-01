/// <reference types="multer" />
/// <reference types="node" />
import 'dotenv/config';
export declare const multerConfig: {
    dest: string;
};
export declare const multerOptions: {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
export declare const encryptString: (plaintext: any, password: any) => string;
export declare const decryptString: (base64CiphertextAndNonceAndSalt: any, password: any) => string;
export declare const encrypt: (plaintext: any, key: any) => Buffer;
export declare const decrypt: (ciphertextAndNonce: any, key: any) => Buffer;
