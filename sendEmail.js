import nodemailer from "nodemailer";
export const sendEmail = async (
  subjecta,
  message,
  send_to,
  sent_from,
  reply_to,
  filename,
  filepath,
  sent_from_name,
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jibrandevm@gmail.com", // generated ethereal user
      pass: "onrevpxaahtnkbuh", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: `${'Jibran'} <${sent_from}>`,
    to: send_to,
    replyTo: reply_to,
    subject: subjecta,
    html: message,
    
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
    }
  });
};