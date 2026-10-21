"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const api_1 = require("./config/api");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin === api_1.frontendOrigin || origin === 'http://localhost:5173') {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }
    next();
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: api_1.apiBaseUrl });
});
app.use('/api', routes_1.default);
app.listen(PORT, () => {
    console.log(`OctoFit backend running at ${api_1.apiBaseUrl}`);
});
