import { handleTimeline } from './handlers/timeline';

const ROUTES = {
  HEALTH: '/health',
  TIMELINE: '/timeline'
};

export const routes = {
  [ROUTES.HEALTH]: {
    GET: () => new Response('OK')
  },
  [ROUTES.TIMELINE]: {
    POST: handleTimeline
  }
} as const;
