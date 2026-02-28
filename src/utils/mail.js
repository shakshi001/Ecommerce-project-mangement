import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerater = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manger",
      link: "https://taskmangerlink.com",
    },
  });

  const emailTextual = mailGenerater.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerater.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    sub: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("email service failed...");
    console.error("Error: ", error);
  }
};

const emailVerificationMailContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to our App! we are excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following  button ",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help , or have questions ? just reply to this email , we'd love to help",
    },
  };
};

const forgetPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "we got request to reset the password",
      action: {
        instructions:
          " to reset your password click on the following button or link",
        button: {
          color: "#22BC66",
          text: "Reset ",
          link: passwordResetUrl,
        },
        outro:
          "Need help , or have questions? just reply to this email , we'd love to solve ",
      },
    },
  };
};

export {
  emailVerificationMailContent,
  forgetPasswordMailgenContent,
  sendEmail,
};
