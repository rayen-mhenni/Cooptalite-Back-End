"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.decryptString = exports.encryptString = void 0;
const crypto_1 = require("crypto");
const ALGORITHM_NAME = 'aes-128-gcm';
const ALGORITHM_NONCE_SIZE = 12;
const ALGORITHM_TAG_SIZE = 16;
const ALGORITHM_KEY_SIZE = 16;
const PBKDF2_NAME = 'sha256';
const PBKDF2_SALT_SIZE = 16;
const PBKDF2_ITERATIONS = 32767;
const encryptString = (plaintext, password) => {
    const salt = (0, crypto_1.randomBytes)(PBKDF2_SALT_SIZE);
    const key = (0, crypto_1.pbkdf2Sync)(new Buffer(password, 'utf8'), salt, PBKDF2_ITERATIONS, ALGORITHM_KEY_SIZE, PBKDF2_NAME);
    const ciphertextAndNonceAndSalt = Buffer.concat([
        salt,
        (0, exports.encrypt)(new Buffer(plaintext, 'utf8'), key),
    ]);
    return ciphertextAndNonceAndSalt.toString('base64');
};
exports.encryptString = encryptString;
const decryptString = (base64CiphertextAndNonceAndSalt, password) => {
    const ciphertextAndNonceAndSalt = new Buffer(base64CiphertextAndNonceAndSalt, 'base64');
    const salt = ciphertextAndNonceAndSalt.slice(0, PBKDF2_SALT_SIZE);
    const ciphertextAndNonce = ciphertextAndNonceAndSalt.slice(PBKDF2_SALT_SIZE);
    const key = (0, crypto_1.pbkdf2Sync)(new Buffer(password, 'utf8'), salt, PBKDF2_ITERATIONS, ALGORITHM_KEY_SIZE, PBKDF2_NAME);
    return (0, exports.decrypt)(ciphertextAndNonce, key).toString('utf8');
};
exports.decryptString = decryptString;
const encrypt = (plaintext, key) => {
    const nonce = (0, crypto_1.randomBytes)(ALGORITHM_NONCE_SIZE);
    const cipher = (0, crypto_1.createCipheriv)(ALGORITHM_NAME, key, nonce);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    return Buffer.concat([nonce, ciphertext, cipher.getAuthTag()]);
};
exports.encrypt = encrypt;
const decrypt = (ciphertextAndNonce, key) => {
    const nonce = ciphertextAndNonce.slice(0, ALGORITHM_NONCE_SIZE);
    const ciphertext = ciphertextAndNonce.slice(ALGORITHM_NONCE_SIZE, ciphertextAndNonce.length - ALGORITHM_TAG_SIZE);
    const tag = ciphertextAndNonce.slice(ciphertext.length + ALGORITHM_NONCE_SIZE);
    const cipher = (0, crypto_1.createDecipheriv)(ALGORITHM_NAME, key, nonce);
    cipher.setAuthTag(tag);
    return Buffer.concat([cipher.update(ciphertext), cipher.final()]);
};
exports.decrypt = decrypt;
//# sourceMappingURL=utils.js.map