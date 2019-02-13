import React from "react";
import { Form, Button, Input } from "./styles";
import googleIcon from "./img/google-soc.svg";
import fbIcon from "./img/fb-soc.svg";
import vkIcon from "./img/vk-soc.svg";

const FormComponent = () => {
  return (
    <Form id="content">
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
        <Input placeholder="Email" type="text" />
        <Input placeholder="Password" type="password" />
      </Form.InputGroup>

      <Form.BtnGroup>
        <Button>Log in</Button>
        <Button>Sign up</Button>
      </Form.BtnGroup>
      <Form.LinkGroup>
        <Form.Link>Forgot password</Form.Link>
      </Form.LinkGroup>
      <Form.Footer>
        <Form.Text>
          By signing up, you agree to our <b>Terms and Conditions</b> &{" "}
          <b>Privacy Policy</b>
        </Form.Text>
      </Form.Footer>
    </Form>
  );
};

export default FormComponent;
