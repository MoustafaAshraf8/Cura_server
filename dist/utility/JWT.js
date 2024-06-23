"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
// import { Error_message_Interface } from "../src/Interface/Error_message_Interface.js";
const ForbiddenAccessException_1 = require("../error/ForbiddenAccessException");
const InvalidTokenException_1 = require("../error/InvalidTokenException");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    static createAccessToken(credential) {
        let accessToken = jsonwebtoken_1.default.sign(credential, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: "10m" });
        return accessToken;
    }
    static createRefreshToken(credentials) {
        let refreshToken = jsonwebtoken_1.default.sign(credentials, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: "10m" });
        return refreshToken;
    }
    static verifyAccessToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw ForbiddenAccessException_1.ForbiddenAccessException;
        }
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, decoded) => {
            if (err) {
                console.log(err);
                throw InvalidTokenException_1.InvalidTokenException;
            }
            else {
                console.log("8888888888888888");
                console.log(Object(decoded).id);
                console.log("8888888888888888");
                // Object(req).user_id = decoded?.indexOf;
                Object(req).user_id = Object(decoded).id;
                next();
            }
        });
    }
    //   public static cookieParser(token: any) {
    //     const accessToken = cookies.accessCookie;
    //     console.log(cookies.accessCookie);
    //   }
    static verifyRefreshToken(req, res, next) {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshCookie))
            res.statusCode = 401;
        const refreshToken = cookies.refreshCookie;
        console.log(cookies.refreshCookie);
        //search for client/seller in refreshCookie table
        //_________
        let foundClient = {
            name: "client-1",
            id: 1,
        };
        if (!foundClient)
            res.statusCode = 403;
        jsonwebtoken_1.default.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET), (err, decoded) => {
            if (err || foundClient.id != decoded.id) {
                res.statusCode = 403;
            }
            const accessToken = this.createAccessToken(String(foundClient.id));
            res.json({ accessToken });
        });
    }
}
exports.JWT = JWT;
