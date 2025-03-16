class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUserDetails(req, res) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedData = req.body;
      const updatedUser = await this.userService.updateUser(
        userId,
        updatedData
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

module.exports = UserController;
