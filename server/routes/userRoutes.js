const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  updateUserController,
  requireSingIn,
} = require("../controllers/userController");

//riouter object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//FORGOT PASSWORD || POST
router.post("/forgotpassword", forgotPasswordController);

router.post("/resetpassword", resetPasswordController);

//UPDATE || PUT
router.put("/update-user", requireSingIn, updateUserController);

//export
module.exports = router;
