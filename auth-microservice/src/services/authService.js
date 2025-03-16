class AuthService {
  constructor(userModel, jwt, bcrypt) {
    this.userModel = userModel;
    this.jwt = jwt;
    this.bcrypt = bcrypt;
  }

  async register(username, password, role) {
    const hashedPassword = await this.bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      role,
    });
    return await user.save();
  }

  async login(username, password) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await this.bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token, user };
  }

  async validateToken(token) {
    try {
      const decoded = this.jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = AuthService;
