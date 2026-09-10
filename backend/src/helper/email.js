const { brevoSenderEmail, brevoApiKey } = require("../secret");

const sendEmail = async (emailData) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: brevoSenderEmail },
        to: [{ email: emailData.email }],
        subject: emailData.subject,
        htmlContent: emailData.html,
      }),
    });

    const data = await response.json();

    // Fetch API তে HTTP এরর (4xx/5xx) স্বয়ংক্রিয়ভাবে catch এ যায় না, তাই response.ok চেক করতে হয়
    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via Brevo API");
    }

    console.log("Message sent via Brevo API: %s", data.messageId || "Success");
    return data;
  } catch (error) {
    console.error("Error occured while sending email via API: ", error.message);
    throw error;
  }
};

module.exports = sendEmail;
