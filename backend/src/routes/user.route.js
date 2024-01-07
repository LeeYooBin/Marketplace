const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);

router.put("/update/:id", authMiddleware, UserController.updateUser);

router.delete("/delete/:id", authMiddleware, UserController.deleteUser);

module.exports = router;