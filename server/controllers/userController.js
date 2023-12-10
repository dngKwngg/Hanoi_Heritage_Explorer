const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword, generateCode } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const { sendEmail } = require("../helpers/sendEmail");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSingIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and 6 character long",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "Email này đã được đăng ký! ",
      });
    }

    //hashed pasword
    const hashedPassword = await hashPassword(password);

    //save user
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Đăng ký thành công, vui lòng đăng nhập!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API!",
      error,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Sai email hoặc mật khẩu!",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Sai email hoặc mật khẩu!",
      });
    }
    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undeinfed password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Đăng nhập thành công!",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API!",
      error,
    });
  }
};



//forgot password
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    //user find
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Nếu email hợp lệ, một mã xác thực đã được gửi.",
      });
    }

    const token = await generateCode(5);
    user.resettoken = token;
    user.resettokenExpiration = Date.now() + 300000;
    await user.save();
    await sendEmail(user.email, user.name, `${token}`, './template/forgotPasswordEmail.html')
    return res.send({ success: true, message: "Chúng tôi đã gửi mã xác thực đến email của bạn!" });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Forgot Password API!",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || user.resettoken !== resetCode) {
      return res.status(400).send({ success: false, message: 'Mã xác thực không đúng, vui lòng thử lại!' });
    }
    if (user.resettokenExpiration < new Date()) {
      return res.status(400).send({ success: false, message: 'Mã xác thực đã hết hạn!' });
    }
    //hashed pasword
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.resettoken = '';
    user.resettokenExpiration = null;
    await user.save();


    return res.status(200).send({
      success: true,
      message: 'Mật khẩu của bạn đã được đặt lại thành công, vui lòng đăng nhập!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Reset Password API!",
      error,
    });
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    //user find
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found!",
      });
    }

    const match = await comparePassword(currentPassword, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Mật khẩu hiện tại không đúng, vui lòng thử lại!",
      });
    }

    const token = await generateCode(5);
    user.resettoken = token;
    user.resettokenExpiration = Date.now() + 300000;
    await user.save();
    await sendEmail(user.email, user.name, `${token}`, './template/changePasswordEmail.html')
    return res.send({ success: true, message: "Chúng tôi đã gửi một mã xác thực đến email của bạn!" });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Change Password API!",
      error,
    });
  }
};

const verificationController = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    //user find

    const user = await userModel.findOne({ email });
    if (!user || user.resettoken !== resetCode) {
      return res.status(400).send({ success: false, message: 'Mã xác thực không đúng, vui lòng thử lại!' });
    }
    if (user.resettokenExpiration < new Date()) {
      return res.status(400).send({ success: false, message: 'Mã xác thực đã hết hạn!' });
    }
    //hashed pasword
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.resettoken = '';
    user.resettokenExpiration = null;
    await user.save();


    return res.status(200).send({
      success: true,
      message: 'Đổi mật khẩu thành công, vui lòng đăng nhập!',
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Verification API!",
      error,
    });
  }
};

const resendCodeController = async (req, res) => {
  try {
    const { email } = req.body;
    //user find
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found!",
      });
    }

    const token = await generateCode(5);
    user.resettoken = token;
    user.resettokenExpiration = Date.now() + 300000;
    await user.save();
    await sendEmail(user.email, user.name, `${token}`, './template/changePasswordEmail.html')
    return res.send({ success: true, message: "Chúng tôi đã gửi lại mã xác thực đến email của bạn!" });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Resend Code API!",
      error,
    });
  }
};

//update user
const updateUserProfileController = async (req, res) => {
  try {
    const { name, email, dateOfBirth } = req.body;
    //user find
    const user = await userModel.findOne({ email });

    //updated profile
    if (name === user.name && JSON.stringify(dateOfBirth) === JSON.stringify(user.dateOfBirth)) {
      return res.status(400).send({
        success: false,
        message: 'Bạn chưa thực hiện thay đổi nào!'
      });
    }

    if (!name) {
      return res.status(400).send({
        success: false,
        message: 'Trường tên không thể bỏ trống!'
      });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        dateOfBirth: dateOfBirth || user.dateOfBirth,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Hồ sơ của bạn đã được cập nhật.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user Profile Update API!",
      error,
    });
  }
};

module.exports = {
  requireSingIn,
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
  verificationController,
  resendCodeController,
  updateUserProfileController,
};
