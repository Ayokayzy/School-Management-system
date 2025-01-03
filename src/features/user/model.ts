import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface avatarObject {
  publicId: string;
  url: String;
}

export interface UserType extends Document {
  _id: Schema.Types.ObjectId;
  fullname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  avatar: avatarObject;
  emailVerified: boolean;
  type: string;
  noOfStaffs: string;
  address: string;
  description: string;
  age: string;
  gender: string;
  class: string;
  subject: string;
  billing: string;
  status: string;
  loginLast: Date;
  deactivated: boolean;
  admin: boolean;
}

const userSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["admin", "staff", "user"],
    default: "admin",
  },
  noOfStaffs: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  class: {
    type: String,
  },
  subject: {
    type: String,
  },
  billing: {
    type: Object,
  },
  avatar: {
    publicId: String,
    url: String,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive", "suspended"],
  },
  loginLast: { type: Date },
  deactivated: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true, default: false },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

export const User = model<UserType>("User", userSchema);
