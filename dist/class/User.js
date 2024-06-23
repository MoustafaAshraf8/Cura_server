"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(json) {
        this.Email = json.Email;
        this.Password = json.Password;
    }
    toJson() {
        return {
            Email: this.Email,
            Password: this.Password,
        };
    }
}
exports.User = User;
