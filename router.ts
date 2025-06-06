import { handleTimeline } from './handlers/timeline';

const ROUTES = {
  TIMELINE: '/timeline'
};

export const routes = {
  [ROUTES.TIMELINE]: {
    POST: handleTimeline
  }
} as const;
