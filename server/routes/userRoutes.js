const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
  verificationController,
  resendCodeController,
  updateUserProfileController,
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
router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password", resetPasswordController);

router.post("/change-password", changePasswordController);

router.post("/change-password-verification", verificationController);

router.post("/resend-code", resendCodeController);

//UPDATE || PUT
router.put("/update-user-profile", requireSingIn, updateUserProfileController);

//export
module.exports = router;
