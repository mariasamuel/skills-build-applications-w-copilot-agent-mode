"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const apiRouter = (0, express_1.Router)();
function addListRoute(path, resourceName, query) {
    apiRouter.get(path, async (_req, res) => {
        try {
            res.json(await query());
        }
        catch (error) {
            console.error(`Failed to fetch ${resourceName}:`, error);
            res.status(500).json({ error: `Failed to fetch ${resourceName}` });
        }
    });
}
addListRoute('/users', 'users', () => user_1.default.find().sort({ name: 1 }).lean().exec());
addListRoute('/teams', 'teams', () => team_1.default.find().sort({ name: 1 }).lean().exec());
addListRoute('/activities', 'activities', () => activity_1.default.find().sort({ date: -1 }).lean().exec());
addListRoute('/leaderboard', 'leaderboard', () => leaderboard_1.default.find().populate('user').populate('team').sort({ rank: 1, points: -1 }).lean().exec());
addListRoute('/workouts', 'workouts', () => workout_1.default.find().sort({ title: 1 }).lean().exec());
exports.default = apiRouter;
