const MONGOOSE = require("../config/dbConnection");
const USERSCHEMA = MONGOOSE.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    emailAddress: {
      type: String,
      default: "",
    },
    primaryEmailAddressId: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    pathRoot: {
      type: String,
      default: "",
    },
    primaryPhoneNumberId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = MONGOOSE.model(
  "SHARP_RESUMEAI_USERS",
  USERSCHEMA,
  "SHARP_RESUMEAI_USERS"
);
