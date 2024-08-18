import usersRepository from "../repositories/users.repository.js";

class AuthService {
  async findOrCreateUser(
    googleId,
    email,
    emailVerified,
    name,
    picture,
    givenName,
    familyName
  ) {
    let user = await usersRepository.findUserByGoogleId(googleId);

    if (!user) {
      user = await usersRepository.createUser(
        googleId,
        email,
        emailVerified,
        name,
        picture,
        givenName,
        familyName
      );
    }
    return user;
  }
}

export default new AuthService();
