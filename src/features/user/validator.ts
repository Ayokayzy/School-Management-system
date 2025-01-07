import { body } from "express-validator";

export const passwordValidator = [
  body("password", "Password is required")
    .trim()
    .notEmpty()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters including a lowercase letter, an uppercase letter,a special symbol and a number"
    ),
];

export const userValidator = [
  body("fullName", "Fullname is required")
    .trim()
    .notEmpty()
    .isString()
    .toLowerCase(),
  body("username", "Username is required")
    .trim()
    .notEmpty()
    .isString()
    .toLowerCase(),
  body("email", "Email is required")
    .trim()
    .isEmail()
    .withMessage("Email address is invalid"),
  ...passwordValidator,
];

export const updateUserValidator = [
  body("fullName", "Fullname is required")
    .trim()
    .isString()
    .toLowerCase(),
  body("username", "Username is required")
    .trim()
    .isString()
    .toLowerCase(),
];
