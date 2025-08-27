// netlify/functions/send-email.js
import sgMail from "@sendgrid/mail";

export async function handler(event, context) {
  try {
    // Ensure it's a POST request
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    // Parse form data from frontend
    let data;
    try {
      data = JSON.parse(event.body);
    } catch (parseErr) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON in request body" }),
      };
    }

    // Read SendGrid API key from Netlify environment variable
    const SENDGRID_API_KEY = process.env.NetlifyContactForm;
    if (!SENDGRID_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "SendGrid API key is missing in environment variables." }),
      };
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    // Compose email message
    const msg = {
      to: "ahbee2963@gmail.com",        // recipient email
      from: "ahbee2963@gmail.com",      // verified sending email in SendGrid
      subject: `New message from ${data.user_name} via contact form`,
      text: `Name: ${data.user_name}\nEmail: ${data.user_email}\nPhone: ${data.user_phone}\nMessage: ${data.message}`,
      html: `<p><strong>Name:</strong> ${data.user_name}</p>
             <p><strong>Email:</strong> ${data.user_email}</p>
             <p><strong>Phone:</strong> ${data.user_phone}</p>
             <p><strong>Message:</strong><br/>${data.message}</p>`,
    };

    // Send email
    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };

  } catch (err) {
    console.error("SendGrid error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error sending email. See console logs for details.",
        details: err.response?.body || err.message // include SendGrid error info if available
      }),
    };
  }
};
