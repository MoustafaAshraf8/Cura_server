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
exports.Payment = void 0;
const axios_1 = __importDefault(require("axios"));
class Payment {
    constructor(clinic, patient) {
        this.getMerchantToken = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const merchant = {
                    api_key: process.env.PAYMOB_MERCHANT_API_KEY,
                    username: process.env.PAYMOB_ACCOUNT_USERNAME,
                    password: process.env.PAYMOB_ACCOUNT_PASSWORD,
                };
                const response = yield axios_1.default.post("https://accept.paymob.com/api/auth/tokens", merchant);
                const authenticationToken = response.data.token;
                //console.log(authenticationToken);
                return authenticationToken;
            }
            catch (err) {
                console.log("ERROR Authenticating, token access unavailable", err);
                return "";
            }
            // return null;
        });
        //getMerchantToken();
        this.getOrderId = (orderList) => __awaiter(this, void 0, void 0, function* () {
            const authenticationToken = yield this.getMerchantToken();
            const data = {
                auth_token: authenticationToken,
                //amount_cents: this.clinic.Fee,
                amount_cents: "5000",
                currency: "EGP",
                delivery_needed: "false",
                items: orderList,
            };
            const response = yield axios_1.default.post("https://accept.paymob.com/api/ecommerce/orders", data);
            const orderId = response.data.id;
            //console.log(orderId);
            return orderId;
        });
        //getOrderId([], 50000);
        this.getPaymentKey = () => __awaiter(this, void 0, void 0, function* () {
            const authenticationToken = yield this.getMerchantToken();
            const orderId = yield this.getOrderId([]);
            const billing_data = {
                apartment: "803",
                email: "claudette09@exa.com",
                floor: "42",
                first_name: "Clifford",
                street: "Ethan Land",
                building: "8028",
                phone_number: "+86(8)9135210487",
                shipping_method: "PKG",
                postal_code: "01898",
                city: "Jaskolskiburgh",
                country: "CR",
                last_name: "Nicolas",
                state: "Utah",
            };
            // const billing_data: Bill = {
            //   apartment: "803",
            //   email: 'claudette09@exa.com',
            //   //email: this.patient.Email as string,
            //   floor: "42",
            //   first_name: this.patient.FirstName as string,
            //   //first_name: this.patient.FirstName as string,
            //   street: "Ethan Land",
            //   building: "8028",
            //   phone_number: "+86(8)9135210487",
            //   shipping_method: "PKG",
            //   postal_code: "01898",
            //   city: "Jaskolskiburgh",
            //   country: "CR",
            //   last_name: this.patient.LastName as string,
            //  // last_name: this.patient.LastName as string,
            //   state: "Utah",
            // };
            const data = {
                auth_token: authenticationToken,
                // amount_cents: (parseInt(this.clinic.Fee as string, 10) * 100).toString(),
                amount_cents: (parseInt("5000", 10) * 100).toString(),
                expiration: 3600,
                order_id: orderId,
                billing_data: billing_data,
                currency: "EGP",
                integration_id: process.env.CARD_INTEGRATION_ID,
                lock_order_when_paid: "false",
            };
            const paymentKeyUrl = "https://accept.paymob.com/api//acceptance/payment_keys";
            const response = yield axios_1.default.post(paymentKeyUrl, data);
            const iFrameToken = response.data.token;
            console.log("https://accept.paymob.com/api/acceptance/iframes/844799?payment_token=" +
                iFrameToken);
            return ("https://accept.paymob.com/api/acceptance/iframes/844799?payment_token=" +
                iFrameToken);
        });
        this.clinic = clinic;
        this.patient = patient;
    }
}
exports.Payment = Payment;
