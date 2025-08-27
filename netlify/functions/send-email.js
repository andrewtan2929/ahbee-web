export async function handler(event, context) {
  try {
    // Parse form data from frontend
    const data = JSON.parse(event.body);

    // Read environment variables
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;
    const privateKey = process.env.PRIVATE_KEY; // Make sure this exists in Netlify

    // Prepare the payload for EmailJS REST API (no user_id needed)
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      template_params: {
        user_name: data.user_name,
        user_email: data.user_email,
        user_phone: data.user_phone,
        message: data.message
      }
    };

    // Send email using EmailJS REST API with Bearer auth
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${privateKey}` // secure private key
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text(); // Get response details
      throw new Error(`EmailJS error: ${response.status} - ${text}`);
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
