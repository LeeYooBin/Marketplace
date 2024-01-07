const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  static createUser = async (username, email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({ username, email, password: hashedPassword });
      await user.save();

      return user;
    } 
    catch (error) {
      throw new Error(error.message || "Error creating user");
    }
  }

  static getUserByEmail = async (email) => {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } 
    catch (error) {
      throw new Error("Error getting user by email");
    }
  }

  static getUserById = async (userId) => {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } 
    catch (error) {
      throw new Error("Error getting user by ID");
    }
  }

  static updateUser = async (userId, newData) => {
    try {
      const { username, email, password } = newData;
      const hashedPassword = await bcrypt.hash(password, 10);
      return Customer.findByIdAndUpdate(userId, {username, email, hashedPassword}, { returnDocument: "after" });
    } 
    catch (error) {
      throw new Error(error.message || "Error updating user");
    }
  }

  static deleteUser = async (userId) => {
    try {
      const user = await this.getUserById(userId);
      await user.remove();

      return user;
    } 
    catch (error) {
      throw new Error(error.message || "Error deleting user");
    }
  }
}

module.exports = UserService;