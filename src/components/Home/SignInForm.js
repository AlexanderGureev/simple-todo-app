import React from "react";
import { useForm, useField } from "react-final-form-hooks";
import createDecorator from "final-form-focus";
import * as IsEmail from "isemail";
import { message } from "antd";
import { useStoreActions } from "easy-peasy";
import { curry } from "ramda";
import { Form, Button, Input, Error } from "./styles";
import googleIcon from "./img/google-soc.svg";
import fbIcon from "./img/fb-soc.svg";
import vkIcon from "./img/vk-soc.svg";

const focusOnErrors = createDecorator();

const onSubmit = curry(async (action, values) => {
  try {
    await action(values);
  } catch (error) {
    message.error(error.message);
  }
});

const validate = ({ email = "", password = "" }) => {
  const errors = {};
  // const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

  if (!email) {
    errors.email = "Email is required.";
  }
  if (!IsEmail.validate(email)) {
    errors.email = "Email is not valid.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }
  // if (!passRegExp.test(password)) {
  //   errors.password =
  //     "Minimum four characters, at least one letter and one number.";
  // }
  return errors;
};

const FormComponent = () => {
  const { authUser } = useStoreActions(actions => actions.session);
  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit: onSubmit(authUser),
    validate
  });

  focusOnErrors(form);
  const email = useField("email", form);
  const password = useField("password", form);

  const handleSubmitForm = async e => {
    e.preventDefault();
    await handleSubmit(e);
    form.reset();
  };

  return (
    <Form id="content" onSubmit={handleSubmitForm}>
      <Form.Header>
        <Form.Header.Title>Sign in</Form.Header.Title>
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
          {...password.input}
          valid={password.meta.valid || !password.meta.touched}
          placeholder="Password"
          type="password"
        />
        {password.meta.touched && password.meta.error && (
          <Error>{password.meta.error}</Error>
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
        <Form.Link to="/signup">Not a member? Sign up</Form.Link>
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
