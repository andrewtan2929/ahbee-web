export async function handler(event, context) {
  try {
    const data = JSON.parse(event.body); // form data from frontend
    const apiKey = process.env.API_KEY;
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;

    // Example: send email logic here
    // await sendEmailUsingAPI(apiKey, serviceId, templateId, data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
