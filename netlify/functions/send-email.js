import fetch from "node-fetch"; // make sure node-fetch is installed if needed

export async function handler(event, context) {
  try {
    // Parse form data from frontend
    const data = JSON.parse(event.body);

    // Read environment variables
    const apiKey = process.env.API_KEY;
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;

    // Prepare the payload for EmailJS REST API
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: apiKey,
      template_params: {
        user_name: data.user_name,
        user_email: data.user_email,
        user_phone: data.user_phone,
        message: data.message
      }
    };

    // Call EmailJS REST API
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
