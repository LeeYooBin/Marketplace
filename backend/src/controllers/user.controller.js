const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");

class UserController {
  static signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) return res.status(400).send({ message: "All fields need to be filled in" });

      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.match(emailFormat)) return res.status(400).json({ message: "Invalid email format" });

      const existingEmail = await UserService.getUserByEmail(email);
      
      if (existingEmail) return res.status(409).send({ message: "The email is already in use" });

      const user = await UserService.createUser(username, email, password);

      return res.status(201).json(user);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error signing up" });
    }
  }

  static signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
    
      const token = UserService.generateToken(user._id, process.env.JWT_SECRET);

      return res.status(200).json({ user, token });
    } 
    catch (error) {
      console.error("Error signing in:", error);
      return res.status(500).json({ message: "Error signing in" });
    }
  }

  static updateUser = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const { username, email, password } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'Invalid user ID' });
      if (!username || !email || !password) return res.status(400).send({ message: "All fields need to be filled in" });
      
      const updatedUser = await UserService.updateUser(id, { username, email, password });

      if (!updatedUser) return res.status(404).send({ message: 'User not found.' });
      return res.status(200).send(updatedUser);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error updating user" });
    }
  }

  static deleteUser = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'Invalid user ID' });

      const deletedUser = await UserService.deleteUser(id);

      return res.status(204).json(deletedUser);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error deleting user" });
    }
  }
}

module.exports = UserController;