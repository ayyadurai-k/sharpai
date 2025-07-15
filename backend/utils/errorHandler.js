const { validationResult } = require("express-validator");

const handleValidationError = (err, res) => {
  if (err.name === "ValidationError") {
    const validationErrors = Object.keys(err.errors).map((field) => ({
      field,
      message: err.errors[field].message,
    }));

    return res.status(400).json({
      status: false,
      message: validationErrors[0].message,
      error: true,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(400).json({
      status: false,
      message: `${field} must be unique. The value '${err.keyValue[field]}' is already taken.`,
      error: true,
    });
  }
};


const validationErrorMessage = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map((err) => err?.msg).join(", "),
      errors: errors.array().map((err) => ({
        field: err?.path,
        value: err?.value,
        message: err?.msg,
      })),
    });
  }
};


module.exports = {
  handleValidationError,
  validationErrorMessage
};
