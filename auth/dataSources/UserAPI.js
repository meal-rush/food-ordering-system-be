class UserAPI {
  constructor({ store }) {
    this.store = store;
  }

  async getUser({ userId }) {
    const user = await this.store.users.findOne({ where: { id: userId } });
    return user ? user : null;
  }

  async getUsers() {
    return await this.store.users.find(); // Replace with your database query logic
  }
}

module.exports = UserAPI;
