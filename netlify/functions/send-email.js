import sgMail from "@sendgrid/mail";

export async function handler(event, context) {
  try {
    // Parse form data from frontend
    const data = JSON.parse(event.body);

    // Read SendGrid API key from Netlify environment variable
    const SENDGRID_API_KEY = process.env.NetlifyContactForm;

    if (!SENDGRID_API_KEY) {
      throw new Error("SendGrid API key is missing in environment variables.");
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: "ahbee2963@gmail.com", // your receiving email
      from: "ahbee2963@gmail.com", // your verified sending email
      subject: `New message from ${data.user_name} via contact form`,
      text: `Name: ${data.user_name}\nEmail: ${data.user_email}\nPhone: ${data.user_phone}\nMessage: ${data.message}`,
      html: `<p><strong>Name:</strong> ${data.user_name}</p>
             <p><strong>Email:</strong> ${data.user_email}</p>
             <p><strong>Phone:</strong> ${data.user_phone}</p>
             <p><strong>Message:</strong><br/>${data.message}</p>`,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending email: " + err.message }),
    };
  }
}
