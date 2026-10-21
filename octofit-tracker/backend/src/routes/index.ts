import { Router } from 'express';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const apiRouter = Router();

function addListRoute(path: string, resourceName: string, query: () => Promise<unknown>) {
  apiRouter.get(path, async (_req, res) => {
    try {
      res.json(await query());
    } catch (error) {
      console.error(`Failed to fetch ${resourceName}:`, error);
      res.status(500).json({ error: `Failed to fetch ${resourceName}` });
    }
  });
}

addListRoute('/users', 'users', () => User.find().sort({ name: 1 }).lean().exec());
addListRoute('/teams', 'teams', () => Team.find().sort({ name: 1 }).lean().exec());
addListRoute('/activities', 'activities', () =>
  Activity.find().sort({ date: -1 }).lean().exec(),
);
addListRoute('/leaderboard', 'leaderboard', () =>
  Leaderboard.find().populate('user').populate('team').sort({ rank: 1, points: -1 }).lean().exec(),
);
addListRoute('/workouts', 'workouts', () => Workout.find().sort({ title: 1 }).lean().exec());

export default apiRouter;
