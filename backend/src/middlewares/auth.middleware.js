import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { EMAIL_WHITELIST } from '../constants/auth.constants.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Invalid token');
    }

    // Check if the user's email is in the whitelist
    if (!EMAIL_WHITELIST.includes(user.email)) {
      return res.status(403).send('Email not authorized');
    }

    req.user = user;
    next();
  });
};
