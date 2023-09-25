import 'dotenv/config';

export const GAME_URL =
  process.env.GAME_URL ?? 'https://couple-game.vercel.app/game';

export const SKUS_URL =
  process.env.SKUS_URL ?? 'https://couple-game.vercel.app/api/skus';
