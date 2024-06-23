"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MailService {
    static sendMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transport = nodemailer_1.default.createTransport({
                    service: "gmail",
                    host: "smtp.gamil.com",
                    port: 465,
                    secure: false,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASSWORD,
                    },
                });
                const mailOptions = {
                    from: {
                        name: "Cura",
                        address: process.env.USER,
                    },
                    to: [email],
                    subject: "Cura sign up",
                    text: "hello world",
                    html: "<h1>thank you for signing up at Cura</h1>",
                };
                yield transport.sendMail(mailOptions);
                console.log("mail sent successfully ✔");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.MailService = MailService;
