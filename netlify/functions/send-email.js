import sgMail from '@sendgrid/mail';

export async function handler(event, context) {
  try {
    // Parse the form data sent from frontend
    const data = JSON.parse(event.body);

    // Read SendGrid API key from Netlify environment variables
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    if (!SENDGRID_API_KEY) {
      throw new Error("SendGrid API key is missing in environment variables.");
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    // Prepare the email
    const msg = {
      to: 'ahbee2963@gmail.com',          // Your email where messages are received
      from: 'noreply@ahbee.com',          // Verified sender email in SendGrid
      subject: `New message from ${data.user_name} via Contact Form`,
      text: `
        Name: ${data.user_name}
        Email: ${data.user_email}
        Phone: ${data.user_phone}
        Message: ${data.message}
      `,
      html: `
        <p><strong>Name:</strong> ${data.user_name}</p>
        <p><strong>Email:</strong> ${data.user_email}</p>
        <p><strong>Phone:</strong> ${data.user_phone}</p>
        <p><strong>Message:</strong><br>${data.message}</p>
      `
    };

    // Send the email
    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" })
    };

  } catch (err) {
    console.error("Error sending email:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
