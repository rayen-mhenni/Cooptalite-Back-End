export declare const encryptString: (plaintext: any, password: any) => string;
export declare const decryptString: (base64CiphertextAndNonceAndSalt: any, password: any) => string;
export declare const encrypt: (plaintext: any, key: any) => Buffer;
export declare const decrypt: (ciphertextAndNonce: any, key: any) => Buffer;
