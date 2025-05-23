// Add to your auth.js or a new contact.js route file
import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Configure your email transport (example uses Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jyrum12@gmail.com",      
      pass: "ubuo ztyt yuvq wawm "           
    }
  });

  const mailOptions = {
    from: email,
    to: "twilightdust30@gmail.com",          
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Thank you for contacting us!");
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).send("Failed to send message. Please try again later.");
  }
});

export default router;