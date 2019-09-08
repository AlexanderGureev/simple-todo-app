import React from "react";
import { message } from "antd";
import VKLogin from "./VkLogin";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
import { Form } from "./styles";

const ENV = process.env.NODE_ENV === "production" ? "PROD" : "DEV";
console.log(ENV);

const SocialBlock = props => {
  const vkOnFailed = error => message.error(error);
  const vkOnSuccess = response => console.log(response);

  const googleOnFailed = error => message.error(error);
  const googleOnSuccess = response => console.log(response);

  const facebookOnFailed = error => {
    console.log(error, "err");
    message.error(error);
  };
  const facebookOnSuccess = response => console.log(response);

  return (
    <Form.SocialBlock>
      <Form.SocialBlock.IconBox>
        <FacebookLogin
          requestCodeUrl={process.env[`REACT_APP_FACEBOOK_REQUEST_URL_${ENV}`]}
          redirectUri={process.env[`REACT_APP_FACEBOOK_REDIRECT_URL_${ENV}`]}
          clientId={process.env[`REACT_APP_FACEBOOK_CLIENT_ID_${ENV}`]}
          onFailure={facebookOnFailed}
          onSuccess={facebookOnSuccess}
        />
        <GoogleLogin
          requestCodeUrl={process.env[`REACT_APP_GOOGLE_REQUEST_URL_${ENV}`]}
          redirectUri={process.env[`REACT_APP_GOOGLE_REDIRECT_URL_${ENV}`]}
          clientId={process.env[`REACT_APP_GOOGLE_CLIENT_ID_${ENV}`]}
          onFailure={googleOnFailed}
          onSuccess={googleOnSuccess}
        />
        <VKLogin
          requestCodeUrl={process.env[`REACT_APP_VK_REQUEST_URL_${ENV}`]}
          redirectUri={process.env[`REACT_APP_VK_REDIRECT_URL_${ENV}`]}
          clientId={process.env[`REACT_APP_VK_CLIENT_ID_${ENV}`]}
          onFailure={vkOnFailed}
          onSuccess={vkOnSuccess}
        />
      </Form.SocialBlock.IconBox>
    </Form.SocialBlock>
  );
};

export default SocialBlock;
