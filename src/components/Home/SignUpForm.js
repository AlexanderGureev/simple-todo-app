import React from "react";
import { useForm, useField } from "react-final-form-hooks";
import createDecorator from "final-form-focus";
import * as IsEmail from "isemail";
import { message } from "antd";
import { Form, Button, Input, Error } from "./styles";
import googleIcon from "./img/google-soc.svg";
import fbIcon from "./img/fb-soc.svg";
import vkIcon from "./img/vk-soc.svg";
import { registerApi } from "../../services/api";

const focusOnErrors = createDecorator();
const onSubmit = async values => {
  try {
    await registerApi(values);
  } catch (error) {
    message.error(error.message);
  }
};
const validate = ({
  email = "",
  username = "",
  password = "",
  confirm = ""
}) => {
  const errors = {};
  const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

  if (!email) errors.email = "Email is required.";
  if (!username) errors.username = "Username is required.";
  if (!IsEmail.validate(email)) errors.email = "Email is not valid.";
  if (!password) errors.password = "Password is required.";

  if (!passRegExp.test(password))
    errors.password =
      "Minimum four characters, at least one letter and one number.";

  if (confirm !== password)
    errors.confirm = "Two passwords that you enter is inconsistent.";

  return errors;
};

const FormComponent = () => {
  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit,
    validate
  });

  focusOnErrors(form);
  const email = useField("email", form);
  const username = useField("username", form);
  const password = useField("password", form);
  const confirm = useField("confirm", form);

  return (
    <Form id="content" onSubmit={handleSubmit}>
      <Form.Header>
        <Form.Header.Title>Sign up</Form.Header.Title>
        <Form.Header.Caption>
          Welcome back, please login to your account.
        </Form.Header.Caption>
      </Form.Header>
      <Form.SocialBlock>
        <Form.SocialBlock.Icon src={googleIcon} />
        <Form.SocialBlock.Icon src={fbIcon} />
        <Form.SocialBlock.Icon src={vkIcon} />
      </Form.SocialBlock>

      <Form.InputGroup>
        <Input
          {...email.input}
          valid={email.meta.valid || !email.meta.touched}
          placeholder="Email"
          type="text"
        />
        {email.meta.touched && email.meta.error && (
          <Error>{email.meta.error}</Error>
        )}
        <Input
          {...username.input}
          valid={username.meta.valid || !username.meta.touched}
          placeholder="Username"
          type="text"
        />
        {username.meta.touched && username.meta.error && (
          <Error>{username.meta.error}</Error>
        )}
        <Input
          {...password.input}
          valid={password.meta.valid || !password.meta.touched}
          placeholder="Password"
          type="password"
        />
        {password.meta.touched && password.meta.error && (
          <Error>{password.meta.error}</Error>
        )}
        <Input
          {...confirm.input}
          valid={confirm.meta.valid || !confirm.meta.touched}
          placeholder="Confirm Password"
          type="password"
        />
        {confirm.meta.touched && confirm.meta.error && (
          <Error>{confirm.meta.error}</Error>
        )}
      </Form.InputGroup>

      <Form.BtnGroup>
        <Button
          type="primary"
          htmlType="submit"
          disabled={pristine || submitting}
          loading={submitting}
        >
          Sign in
        </Button>
      </Form.BtnGroup>
      <Form.LinkGroup>
        <Form.Link to="/">Already registered? Sign in</Form.Link>
        <Form.Link to="/">Forgot password</Form.Link>
      </Form.LinkGroup>
      <Form.Footer>
        <Form.Text>
          By signing up, you agree to our Terms and Conditions & Privacy Policy
        </Form.Text>
      </Form.Footer>
    </Form>
  );
};

export default FormComponent;
