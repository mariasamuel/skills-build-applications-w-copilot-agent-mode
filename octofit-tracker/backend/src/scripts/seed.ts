import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const objectId = (value: string) => new mongoose.Types.ObjectId(value);

function replaceOne(id: string, data: Record<string, unknown>): mongoose.AnyBulkWriteOperation {
  const _id = objectId(id);
  return {
    replaceOne: {
      filter: { _id },
      replacement: { _id, ...data },
      upsert: true,
    },
  };
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const ids = {
      teams: {
        trailblazers: '650000000000000000000001',
        sunriseStriders: '650000000000000000000002',
      },
      users: {
        maya: '650000000000000000000101',
        leo: '650000000000000000000102',
        ava: '650000000000000000000103',
        noah: '650000000000000000000104',
      },
    };

    await Team.bulkWrite([
      replaceOne(ids.teams.trailblazers, {
        name: 'Trailblazers',
        description: 'A team for runners and outdoor explorers.',
        members: [objectId(ids.users.maya), objectId(ids.users.leo)],
        points: 4570,
      }),
      replaceOne(ids.teams.sunriseStriders, {
        name: 'Sunrise Striders',
        description: 'Building healthy habits one morning at a time.',
        members: [objectId(ids.users.ava), objectId(ids.users.noah)],
        points: 3730,
      }),
    ]);

    await User.bulkWrite([
      replaceOne(ids.users.maya, {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        name: 'Maya Chen',
        team: objectId(ids.teams.trailblazers),
        totalPoints: 2450,
      }),
      replaceOne(ids.users.leo, {
        username: 'leo.martin',
        email: 'leo.martin@example.com',
        name: 'Leo Martin',
        team: objectId(ids.teams.trailblazers),
        totalPoints: 2120,
      }),
      replaceOne(ids.users.ava, {
        username: 'ava.patel',
        email: 'ava.patel@example.com',
        name: 'Ava Patel',
        team: objectId(ids.teams.sunriseStriders),
        totalPoints: 1980,
      }),
      replaceOne(ids.users.noah, {
        username: 'noah.james',
        email: 'noah.james@example.com',
        name: 'Noah James',
        team: objectId(ids.teams.sunriseStriders),
        totalPoints: 1750,
      }),
    ]);

    await Activity.bulkWrite([
      replaceOne('650000000000000000000201', {
        user: objectId(ids.users.maya),
        type: 'running',
        durationMinutes: 38,
        distanceKm: 6.2,
        points: 62,
        date: new Date('2026-10-20T07:15:00Z'),
      }),
      replaceOne('650000000000000000000202', {
        user: objectId(ids.users.leo),
        type: 'cycling',
        durationMinutes: 55,
        distanceKm: 18.5,
        points: 74,
        date: new Date('2026-10-19T06:45:00Z'),
      }),
      replaceOne('650000000000000000000203', {
        user: objectId(ids.users.ava),
        type: 'strength',
        durationMinutes: 32,
        points: 48,
        date: new Date('2026-10-20T08:00:00Z'),
      }),
      replaceOne('650000000000000000000204', {
        user: objectId(ids.users.noah),
        type: 'walking',
        durationMinutes: 45,
        distanceKm: 3.8,
        points: 38,
        date: new Date('2026-10-18T09:30:00Z'),
      }),
    ]);

    await Leaderboard.bulkWrite([
      replaceOne('650000000000000000000401', {
        user: objectId(ids.users.maya),
        team: objectId(ids.teams.trailblazers),
        points: 2450,
        rank: 1,
      }),
      replaceOne('650000000000000000000402', {
        user: objectId(ids.users.leo),
        team: objectId(ids.teams.trailblazers),
        points: 2120,
        rank: 2,
      }),
      replaceOne('650000000000000000000403', {
        user: objectId(ids.users.ava),
        team: objectId(ids.teams.sunriseStriders),
        points: 1980,
        rank: 3,
      }),
      replaceOne('650000000000000000000404', {
        user: objectId(ids.users.noah),
        team: objectId(ids.teams.sunriseStriders),
        points: 1750,
        rank: 4,
      }),
    ]);

    await Workout.bulkWrite([
      replaceOne('650000000000000000000301', {
        title: 'Easy 5K Builder',
        description: 'A steady run with a gentle warm-up and cool-down.',
        difficulty: 'beginner',
        durationMinutes: 35,
        activityType: 'running',
      }),
      replaceOne('650000000000000000000302', {
        title: 'Full-Body Strength',
        description: 'A balanced bodyweight circuit with rest between rounds.',
        difficulty: 'intermediate',
        durationMinutes: 30,
        activityType: 'strength',
      }),
      replaceOne('650000000000000000000303', {
        title: 'Weekend Cycle',
        description: 'A relaxed outdoor ride focused on consistent pacing.',
        difficulty: 'beginner',
        durationMinutes: 50,
        activityType: 'cycling',
      }),
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding octofit_db:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
