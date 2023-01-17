"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.decryptString = exports.encryptString = exports.multerOptions = exports.multerConfig = void 0;
const crypto_1 = require("crypto");
const path_1 = require("path");
const fs_1 = require("fs");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
require("dotenv/config");
exports.multerConfig = {
    dest: process.env.UPLOAD_LOCATION,
};
exports.multerOptions = {
    limits: {
        fileSize: 1024 * 1024 * 7,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = exports.multerConfig.dest;
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
};
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