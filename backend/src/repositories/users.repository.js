import { User } from "../mongo/users.mongo.js";

class UserRepository {
  async findUserByGoogleId(googleId) {
    return User.findOne({ googleId });
  }

  async createUser(
    googleId,
    email,
    emailVerified,
    name,
    picture,
    givenName,
    familyName
  ) {
    const user = new User({
      googleId,
      email,
      emailVerified,
      name,
      picture,
      givenName,
      familyName
    });
    return user.save();
  }
}

export default new UserRepository();
