export async function handler(event, context) {
  // Read the environment variable
  const apiKey = process.env.API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({ key: apiKey }),
  };
}
