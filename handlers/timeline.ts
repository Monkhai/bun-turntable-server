
const TURNTABLE_SERVER_ADDRESS = 'http://localhost:9000';

export const handleTimeline = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();

    console.log('body', body);
    
    const response = await fetch(`${TURNTABLE_SERVER_ADDRESS}/api/TurntableTimeline`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    console.log('response', response);

    if (!response.ok) {
      throw new Error(`Turntable server responded with status: ${response.status}`);
    }

    return Response.json({ message: 'Timeline forwarded successfully' });

  } catch (error) {
    console.error('Error processing timeline:', error);
    
    const isValidationError = error instanceof Error && error.message.includes('ZodError');
    const errorMessage = isValidationError ? 'Invalid timeline data' : 'Internal server error';
    const statusCode = isValidationError ? 400 : 500;

    return Response.json({ error: errorMessage }, { status: statusCode });
  }
}; 