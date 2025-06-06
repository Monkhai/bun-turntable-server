import { routes } from './router';

const server = Bun.serve({
  port: 3001,
  routes,

  // Fallback for unmatched routes
  fetch(req) {
    return new Response('Not Found', { status: 404 });
  }
});

console.log(`Server running on http://localhost:${server.port}`);
console.log(`Routes configured:`, Object.keys(routes));
