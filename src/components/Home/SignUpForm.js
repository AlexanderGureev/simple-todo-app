import React, { useState } from "react";
import { message, Form as AntdForm } from "antd";
import { useStoreActions } from "easy-peasy";
import { Form, Button, Input } from "./styles";
import { validateRules, hasErrors } from "./validateRules";
import googleIcon from "./img/google-soc.svg";
import fbIcon from "./img/fb-soc.svg";
import vkIcon from "./img/vk-soc.svg";

const FormComponent = ({ form }) => {
  const { registerUser } = useStoreActions(actions => actions.session);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, getFieldsError } = form;

  const handleSubmit = async e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      try {
        if (!err) {
          setLoading(true);
          await registerUser(values);
        }
      } catch (error) {
        setLoading(false);
        message.error(error.message);
      }
    });
  };

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
        <Form.Item>
          {getFieldDecorator("username", validateRules(form).username)(
            <Input placeholder="Username" type="text" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", validateRules(form).email)(
            <Input placeholder="Email" type="text" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", validateRules(form).password)(
            <Input.Password placeholder="Password" type="password" />
          )}
        </Form.Item>
      </Form.InputGroup>

      <Form.BtnGroup>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
          loading={loading}
        >
          Sign up
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

export default AntdForm.create({ name: "registerForm" })(FormComponent);
