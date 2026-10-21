import express from 'express';
import './config/database';
import { apiBaseUrl, frontendOrigin } from './server';
import apiRouter from './routes';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin === frontendOrigin || origin === 'http://localhost:5173') {
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
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`OctoFit backend running at ${apiBaseUrl}`);
});
