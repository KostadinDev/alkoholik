/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv";
import authService from "../services/auth.service.js"

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

class AuthController {
  async googleLogin(req, res) {
    const { token } = req.body;
    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const googleId = payload?.sub;

      if (!googleId) {
        throw new Error('Invalid Google ID');
      }

      // Find or create the user
      const user = await authService.findOrCreateUser(
        googleId,
        payload.email,
        payload.email_verified,
        payload.name,
        payload.picture,
        payload.given_name,
        payload.family_name
      );

      // Create a JWT for your application with the entire user object
      const appToken = jwt.sign(
        {
          sub: user.googleId,
          email: user.email,
          emailVerified: user.emailVerified,
          name: user.name,
          picture: user.picture,
          givenName: user.givenName,
          familyName: user.familyName,
          _id: user._id
        },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Store the application token in an HTTP-only cookie
      res.cookie('token', appToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      res.status(200).send('Login successful');
    } catch (error) {
      console.error('error', error);
      res.status(401).send('Invalid token');
    }
  }

  getUser(req, res) {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).send('No token provided');
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({ user: decoded });
    } catch (error) {
      res.status(401).send('Invalid token');
    }
  }

  logout(req, res) {
    res.clearCookie('token');
    res.status(200).send('Logged out');
  }
}

export default new AuthController();
