import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../Model/user.js";
import fs from 'fs';
import path from 'path'; 
 
const secret = 'test';
const JWT_SECRET = 'random_09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
const resetPasswordTokens = [];
const generateToken = () => { return crypto.randomBytes(20).toString('hex') };

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again later.',
});

//! use when sent the eamil for forget apssword ans have the token which will expire in few hours
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

//! 1) //*generate token and then sent to frontend for cookies
// if (req.body.password == '123') {
//   // Passwords match, generate a JWT token
//   const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '5h' });
//   res.status(200).json({ token });

//! 2) //*generate token and then sent to frontend for reset the password

// const token = generateToken();
// const expirationTime = Date.now() + 3600000; // 1 hour from now
// resetPasswordTokens.push({ userID, email, token, expirationTime });//you can sent multiple items to this array to verify the user or to get data from it

//! 3) //*check the requested token is here or not
// app.post('/api/reset-password', async (req, res) => {
//   const { token, password } = req.body;
//   const resetToken = resetPasswordTokens.find((item) => item.token === token);
//   const resetTokenuserID = resetPasswordTokens.find((item) => item.userID);
//   if (!resetToken) {
//     return res.status(404).json({ message: 'Invalid or expired token' });
//   }
//   if (resetToken.expirationTime < Date.now()) {
//     return res.status(401).json({ message: 'Token has expired' });
//   }
//   const index = resetPasswordTokens.indexOf(resetToken);
//   if (index !== -1) {
//     resetPasswordTokens.splice(index, 1);
//   }
//   res.status(200).json({ message: 'Password reset successful' });
// });


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token, success: true });

  } catch (err) {
    res.status(500).json({ message: "some went wrong" });
  }
};

export const signup = async (req, res) => {
  console.log(req.body)
  const { email, password, username } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, username });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ success: true, result, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
    console.log(error);
  }
};
