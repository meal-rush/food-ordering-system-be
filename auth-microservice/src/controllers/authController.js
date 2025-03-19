class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      if (!username || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await this.authService.register(username, password, role);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      await this.authService.logout(req.user);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
