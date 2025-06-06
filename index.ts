import { routes } from './router';

// CORS headers for all origins
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
  'Access-Control-Max-Age': '86400', // 24 hours
};

// Add CORS headers to any response
function addCorsHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

const server = Bun.serve({
  port: 3001,
  
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    // Handle preflight OPTIONS requests
    if (method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders 
      });
    }

    // Check if route exists
    const route = routes[pathname as keyof typeof routes];
    if (route && route[method as keyof typeof route]) {
      try {
        const handler = route[method as keyof typeof route] as Function;
        const response = await handler(req);
        return addCorsHeaders(response);
      } catch (error) {
        console.error('Route handler error:', error);
        return addCorsHeaders(new Response('Internal Server Error', { status: 500 }));
      }
    }

    // Fallback for unmatched routes
    return addCorsHeaders(new Response('Not Found', { status: 404 }));
  }
});

console.log(`Server running on http://localhost:${server.port}`);
console.log(`Routes configured:`, Object.keys(routes));


