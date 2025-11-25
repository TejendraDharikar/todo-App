"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const currentWorkingDirectory = process.cwd();
    const filePath = path_1.default.join(currentWorkingDirectory, 'src/pages/index.html');
    try {
        const content = fs_1.default.readFileSync(filePath);
        res.status(200).type('html').send(content);
    }
    catch {
        res.status(500).send('<h1>Error loading page</h1>');
    }
});
router.get('/contact-us', (req, res) => {
    const currentWorkingDirectory = process.cwd();
    const filePath = path_1.default.join(currentWorkingDirectory, 'src/pages/contact.html');
    try {
        const content = fs_1.default.readFileSync(filePath);
        res.status(200).type('html').send(content);
    }
    catch {
        res.status(500).send('<h1>Error loading page</h1>');
    }
});
router.get('/about-us', (req, res) => {
});
exports.default = router;
//# sourceMappingURL=pageRoutes.js.map