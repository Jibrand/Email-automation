import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import {sendEmail} from './sendEmail.js'
import fs from "fs";
import xlsx from "xlsx";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directory = __dirname;
const logo = path.join(directory, 'logo.png');
console.log(logo);

const PORT = process.env.PORT || 5005;
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", (req, res) => res.status(200).send("Hello world"));
////////////////////////////////////////////////////////////////////////////


 

app.post('/23', async (req, res) => {
  try {
    const excelFilePath = './SMMA.xlsx';

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const recipients = [];
    const nameColumn = 'A';
    const websiteColumn = 'B';
    const emailColumn = 'C';

    // Iterate over rows starting from the 2nd row (assuming the first row is the header)
    for (let row = 1; worksheet[`${nameColumn}${row}`]; row++) {
      const name = worksheet[`${nameColumn}${row}`].v;
      const website = worksheet[`${websiteColumn}${row}`].v;
      const email = worksheet[`${emailColumn}${row}`].v;
      recipients.push({ name, website, email });
    }

    const getRandomDelay = () => Math.random() * 29000 + 1000; // Random delay between 1 and 30 seconds

    for (const { name, website, email } of recipients) {
      const subject = `Transform Your Client Acquisition to AI Chatbots`;

      const message = ` 
      
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #1D2144; color: Azure;">

      <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 10px; box-sizing: border-box;">
  
          <div style="text-align: center; color: white;">
              <h1>🤖 Revolutionize Your Business with AI Chatbots 🚀</h1>
          </div>
  
          <div style="margin-top: 20px; background-color: white; padding: 20px; border-radius: 5px;">
  
              <div
                  style="background-color: #1D2144; color: Azure; padding: 10px; border-radius: 5px; margin-bottom: 10px; font-size: 20px;">
                  Supercharge Client Acquisition with AI! </div>
  
              <div
                  style="background-color: Azure; color: #1D2144; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                  <p> Dear ${name} </p> Are you <b>tired of spending countless hours trying to acquire new clients</b>
                  without seeing the desired results? We understand the challenges you face in today's competitive market,
                  and we have the perfect solution for you
                  <p>Introducing AI Chatbots, the groundbreaking technology that can revolutionize your client acquisition
                      efforts. Our advanced AI-powered chatbot models are designed to provide personalized and effective
                      interactions with your audience, ensuring enhanced customer engagement and driving business success.
                  </p>
                  <p>Imagine the power of having a virtual assistant that is available 24/7, capable of handling multiple
                      conversations simultaneously without compromising quality.</p>
              </div>
              <ul>
                  <li style="color: black"><span style="color: #1D2144; font-weight: bold;">Special Only for you:</span>
                      Avail a 40% discount on our AI chatbot services!</li>
                  <li style="color: black"><span style="color: #1D2144; font-weight: bold;">7-Days Free Trial:</span>
                      Experience the power of AI with a risk-free trial period.</li>
                  <li style="color: black"><span style="color: #1D2144; font-weight: bold;">Fast Delivery:</span> Get your
                      chatbot up and running in just 2 days!</li>
                  <li style="color: black"><span style="color: #1D2144; font-weight: bold;">Money-Back Guarantee:</span>
                      We offer a 30-day money-back guarantee. Your satisfaction is our priority.</li>
              </ul>
  
              <div
                  style="background-color: #1D2144; color: Azure; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                  Ready to Transform your client acquisition strategy Into AI?
  
              </div>
  
              <div
                  style="background-color: Azure; color: #1D2144; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                  Getting started is easy! Simply click the button below to explore our plans and start your journey with
                  WebTose AI Chatbots.
              </div>
  
              <div style="text-align: center; margin-top: 20px; background-color: white; padding: 20px; border-radius: 5px; color: #1D2144;">
                  <!-- Centered Button -->
                  <a href="https://webtose.netlify.app/contact" style="display: inline-block; padding: 10px 20px; text-decoration: none; background-color: #1D2144; color: Azure; border: 2px solid Azure; border-radius: 5px;">
                      Get Started Today
                  </a>
              </div>
              
  
          </div>
  
          <div style="margin-top: 20px; text-align: center; color: white;">
              <p>Best Regards,<br> The WebTose Team</p>
          </div>
  
      </div>
  
  </body>
 `;

      const send_to = email;
      const sent_from_name = 'Jibran';
      const sent_from = 'jibrandevm@gmail.com';
      const reply_to = 'jibrandevm@gmail.com';

      await sendEmail(subject, message, send_to, sent_from, reply_to, sent_from_name);
      console.log(`Email sent to: ${name} whose email address is ${email}, and website ${website}`);

      const randomDelay = getRandomDelay();
      console.log(`Waiting for ${randomDelay / 1000} seconds before sending the next email`);
      await new Promise(resolve => setTimeout(resolve, randomDelay));
   
    }

    res.status(200).send('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails.');
  }
});

app.post('/livemenu', async (req, res) => {
    try {
      const excelFilePath = './SMMA1.xlsx';
  
      const workbook = xlsx.readFile(excelFilePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      const recipients = [];
      const nameColumn = 'A';
      const websiteColumn = 'B';
      const emailColumn = 'C';
  
      // Iterate over rows starting from the 2nd row (assuming the first row is the header)
      for (let row = 1; worksheet[`${nameColumn}${row}`]; row++) {
        const name = worksheet[`${nameColumn}${row}`].v;
        const website = worksheet[`${websiteColumn}${row}`].v;
        const email = worksheet[`${emailColumn}${row}`].v;
        recipients.push({ name, website, email });
      }
  
      const getRandomDelay = () => Math.random() * 29000 + 1000; // Random delay between 1 and 30 seconds
  
      for (const { name, website, email } of recipients) {
        const subject = `Free 30-Day Trial: Contactless Menu Solution to Overcome Restaurant Challenges`;
  
        const message = ` 
        
        <style>
        .ff{
            font-family: Georgia, 'Times New Roman', Times, serif;
        }
    </style>
    <body>
        <div dir="ltr" class="es-wrapper-color" style="  ">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#FF6E12"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0"
                                                cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20" align="left">
                                                            <!--[if mso]><table width="560" cellpadding="0"
                                cellspacing="0"><tr><td width="241" valign="top"><![endif]-->
                                                            <table cellpadding="0" cellspacing="0" class="es-left"
                                                                align="left" style="margin-bottom: 10px;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="241"
                                                                            class="es-m-p0r es-m-p20b esd-container-frame"
                                                                            valign="top" align="center">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                width="100%">
                                                                                <tbody>
                                                                                    
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        <td class="es-m-txt-c"
                                                                            style="font-size: 40px; font-weight: bolder; color: #333333; font-family:    Helvetica, sans-serif;">
                                                                            <b><u>LiveMenu</u></b>
                                                                        </td>
    
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!--[if mso]></td><td width="20"></td><td width="299" valign="top"><![endif]-->
    
                                                            <!--[if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table class="es-content-body" style="background-color: #ffffff;" width="600"
                                                cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p40" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="520" class="esd-container-frame"
                                                                            align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                width="100%" bgcolor="#fef852"
                                                                                style="background-color: #ffe600; border-radius: 20px; border-collapse: separate;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center"
                                                                                            class="esd-block-text es-p30t es-p10b es-p20r es-p20l"
                                                                                            style="color: black;">
                                                                                            <h1>Solution for the <br>Pain of
                                                                                                your Customers</h1>
                                                                                            <p style="font-size: 16px;">
                                                                                                Contact-Less Menu Solution!
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center"
                                                                                            class="esd-block-text es-p30b">
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p40b es-p40r es-p40l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="520" class="esd-container-frame"
                                                                            align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="left"
                                                                                            class="esd-block-text es-p5t es-p5b">
                                                                                            <h3>Dear Restaurant,</h3>
                                                                                            <p class="ff">Are you grappling with
                                                                                                restaurant<b> pains or
                                                                                                struggling to boost sales?</b>
                                                                                                We have a solution that can
                                                                                                help!
                                                                                            </p>
    
                                                                                            <p class="ff">Our Contactless Menu solution
                                                                                                is designed to streamline
                                                                                                operations and increase
                                                                                                revenue. With touch-free
                                                                                                ordering and payment
                                                                                                options, you can provide a
                                                                                                safer and more convenient
                                                                                                dining experience for your
                                                                                                customers.
    
                                                                                            </p>
                                                                                            <p class="ff">To help you experience the
                                                                                                benefits firsthand, we're
                                                                                                offering a complimentary
                                                                                              <b> <u> 30-day trial</u></b> of our
                                                                                                solution. This gives you the
                                                                                                opportunity to see how it
                                                                                                can alleviate your pain
                                                                                                points and drive sales
                                                                                                without any commitment.
    
                                                                                            </p>
                                                                                            <p class="ff">Let's schedule a one-on-one
                                                                                                meeting to discuss how our
                                                                                                Contactless Menu solution
                                                                                                can transform your
                                                                                                restaurant's operations.
                                                                                                When would be a convenient
                                                                                                time for you to meet?
                                                                                            </p>
    
                                                                                            <p class="ff">Looking forward to helping
                                                                                                your restaurant thrive.
                                                                                            </p>
    
                                                                                            <p class="ff">Best regards,<br>Jibran<br>
                                                                                                +92 337 1215526</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                               
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
   `;
  
        const send_to = email;
        const sent_from_name = 'Jibran';
        const sent_from = 'jibrandevm@gmail.com';
        const reply_to = 'jibrandevm@gmail.com';
  
        await sendEmail(subject, message, send_to, sent_from, reply_to, sent_from_name);
        console.log(`Email sent to: ${name} whose email address is ${email}, and website ${website}`);
  
        const randomDelay = getRandomDelay();
        console.log(`Waiting for ${randomDelay / 1000} seconds before sending the next email`);
        await new Promise(resolve => setTimeout(resolve, randomDelay));
     
      }
  
      res.status(200).send('Emails sent successfully.');
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).send('Error sending emails.');
    }
  });
    

      
 


////////////////////////////////////////////////////////////////////////////
const CONNECTION_URL = "mongodb+srv://jibran:jibranmern@clusterone.u74t8kf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => { console.log('Connected Succesfully.') }).catch((err) => console.log('no connection ', err))
const server = app.listen(PORT, () => console.log("Listening on port ", PORT)); 