export const hasErrors = fieldsError =>
  Object.keys(fieldsError).some(field => fieldsError[field]);

export const validateRules = form => ({
  username: {
    rules: [{ required: true, message: "Please input your name!" }]
  },
  email: {
    rules: [
      { required: true, message: "Please input your email!" },
      {
        type: "email",
        message: "The input is not valid E-mail!"
      }
    ]
  },
  password: {
    rules: [
      { required: true, message: "Please input your password!" }
      // {
      //   validator: (rule, value, callback) => {
      //     const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
      //     if (!passRegExp.test(value)) {
      //       callback(
      //         "Minimum four characters, at least one letter and one number."
      //       );
      //     } else {
      //       callback();
      //     }
      //   }
      // }
    ]
  },
  confirmPassword: {
    rules: [
      { required: true, message: "Please input your confirm password!" },
      {
        validator: (rule, value, callback) => {
          if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
          } else {
            callback();
          }
        }
      }
    ]
  }
});
