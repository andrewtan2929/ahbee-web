export async function handler(event, context) {
  const apiKey = process.env.API_KEY;
  const serviceId = process.env.SERVICE_ID;
  const templateId = process.env.TEMPLATE_ID;

  return {
    statusCode: 200,
    body: JSON.stringify({
      API_KEY: apiKey,
      SERVICE_ID: serviceId,
      TEMPLATE_ID: templateId
    }),
  };
}

