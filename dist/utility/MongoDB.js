"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
class test {
    constructor() { }
    static getFileStoreName() {
        return this.fileStoreBucket;
    }
}
exports.test = test;
test.fileStoreBucket = "FileStore";
