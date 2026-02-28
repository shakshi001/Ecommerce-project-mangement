import { Router } from "express";
import {
  login,
  logoutUser,
  registerUser,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgetPasswordRequest,
  changeCurrentPassword,
  resetForgetPassword,

} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userForgetPasswordValidator,
  userResetForgotPasswordValidator,
  userChangeCurrentPasswordValidator
} from "../validator/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecure route
router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/refresh-token").post(refreshAccessToken);

router
  .route("/forgot-password")
  .post(userForgetPasswordValidator(), validate, forgetPasswordRequest);

router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgetPassword);

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);

// secure route
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );

router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

// verifyJWT;
router.route("/logout").post(verifyJWT , logoutUser);

export default router;
