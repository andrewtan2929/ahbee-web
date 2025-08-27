// netlify/functions/send-email.js

export async function handler(event, context) {
  try {
    // 1️⃣ Parse form data from frontend
    const data = JSON.parse(event.body);

    // 2️⃣ Read environment variables
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;
    const privateKey = process.env.PRIVATE_KEY; // your EmailJS private key

    // 3️⃣ Prepare the payload
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

    // 4️⃣ Send request to EmailJS using private key
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${privateKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.status} - ${response.statusText}`);
    }

    // 5️⃣ Return success
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" })
    };

  } catch (err) {
    // 6️⃣ Return error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
