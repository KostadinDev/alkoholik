import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
});

export const User = model('User', userSchema);
