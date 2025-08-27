export async function handler(event, context) {
  try {
    const data = JSON.parse(event.body);

    const apiKey = process.env.API_KEY;
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: apiKey, // private key
      template_params: {
        user_name: data.user_name,
        user_email: data.user_email,
        user_phone: data.user_phone,
        message: data.message
      }
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`EmailJS error: ${response.status} - ${errText}`);
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
