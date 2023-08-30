import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import {sendEmail} from './sendEmail.js'
import fs from "fs";
import xlsx from "xlsx";

const PORT = process.env.PORT || 5005;
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", (req, res) => res.status(200).send("Hello world"));
////////////////////////////////////////////////////////////////////////////


app.post('/send-emails-from-excel', async (req, res) => {
  try {
    const excelFilePath = './SMMA.xlsx';

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];

    const recipients = [];
    const nameColumn = "A"; // Column containing names
    const emailColumn = "B"; // Column containing email addresses

    for (const cell in worksheet) {
      if (recipients.length >= 27) {
        break; // Exit the loop after sending emails to the first 5 recipients
      }

      if (cell.startsWith(nameColumn) && worksheet[cell].v !== undefined) {
        const name = worksheet[cell].v;
        const emailCell = `${emailColumn}${cell.slice(1)}`; // Get the corresponding email cell
        const email = worksheet[emailCell].v;
        recipients.push({ name, email });
      }
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const { name, email } of recipients) {
      const subject = `Hey ${name}, I see your Website but this breaks my heart 💔`; // Set your email subject here
      const message = `
      <p style="margin-bottom:30px">Hey ${name},</p> 
      <p style="margin-bottom:30px">Your website came highly recommended, and I must say your design work is truly impressive. I'm loving what I see,  and I want to see you on top!</p>
      <p style="margin-bottom:30px">Btw, I was wondering do you guys need a <b>Web designer and web developer Specialist</b> who works specifically with <b>Real States?</b></p>
      <p style="margin-bottom:30px">If your average sale and traffic on website is less than 50% then you need to invest in good quality web  design to keep viewers hooked so that you keep on growing!</p>
      <p style="margin-bottom:30px"><b>Good news! </b><i>I can help you with that!</i></p>
      <p style="margin-bottom:30px"><b>LET ME KNOW IF YOU WANT TO SEE MY WORK SAMPLES!</b></p>
      <p style="margin-bottom:30px"><i>If not, reply with “NO” and I will remove you from my follow up list!</i></p>
      <p style="margin-bottom:30px"><b>Keep creating Sales!</b></p>
      <p style="margin-bottom:-20px">Your Big Fan</p>
      <p style="margin-top:-10px">Muhammad Jibran</p>
      `; // Set your personalized email message here
      const send_to = email;
      const sent_from_name = "Jibran"; 
      const sent_from = "jibrandevm@gmail.com"; // Set your sender email
      const reply_to = "jibrandevm@gmail.com"; // Set your reply-to email

      await sendEmail(subject, message, send_to, sent_from, reply_to,sent_from_name);

      console.log(`Email sent to: ${name} whose email address is ${email}`);
      await delay(10000); // Delay for 10 seconds before sending the next email
    }

    res.status(200).send("Emails sent successfully.");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails.");
  }
});




////////////////////////////////////////////////////////////////////////////
const CONNECTION_URL = "mongodb+srv://jibran:jibranmern@clusterone.u74t8kf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => { console.log('Connected Succesfully.') }).catch((err) => console.log('no connection ', err))
const server = app.listen(PORT, () => console.log("Listening on port ", PORT)); 