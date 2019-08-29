import React, { useState, useEffect, useRef } from "react";
import { useStoreActions } from "easy-peasy";
import { message } from "antd";
import googleIcon from "./img/google-soc.svg";
import { Form } from "./styles";
import SocialService from "../../services/social";

const GoogleLogin = ({
  requestCodeUrl = "",
  clientId = "",
  redirectUri = "",
  onFailure = () => {},
  onSuccess = () => {},
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const { socialAuthorizeUserAction } = useStoreActions(
    actions => actions.session
  );

  const provider = "google";
  const loadingIndicator = useRef(() => {});
  const socialService = new SocialService(requestCodeUrl);

  const setLoadingIndicator = () => {
    loadingIndicator.current = message.loading("Signing in", 0);
  };
  const clearLoadingIndicator = () => loadingIndicator.current();

  useEffect(() => {
    loading ? setLoadingIndicator() : clearLoadingIndicator();
    return () => clearLoadingIndicator();
  }, [loading]);

  const onButtonClick = e => {
    e.preventDefault();
    getParams()
      .then(queryParams => {
        socialService.getCode(queryParams, success, failure);
      })
      .catch(failure);
  };

  const getParams = async () => {
    if (!clientId || !redirectUri || !requestCodeUrl) {
      throw new Error("Bad params");
    }
    // const token = await socialService.getRequestToken();

    const params = {
      response_type: rest.responseType || "code",
      scope:
        rest.scope ||
        ["profile", "https://www.googleapis.com/auth/userinfo.email"].join(" "),
      client_id: clientId,
      redirect_uri: redirectUri,
      include_granted_scopes: true
      // state: token
    };

    const paramsConstructor = new URLSearchParams();
    Object.keys(params).map(key => paramsConstructor.append(key, params[key]));

    return paramsConstructor.toString();
  };

  const success = async (code, state) => {
    try {
      setLoading(true);
      await socialAuthorizeUserAction({ provider, code, state });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      onFailure(error.message);
    } finally {
      setLoading(false);
    }
  };

  const failure = error => {
    console.log(error.message || error);
  };

  return (
    <Form.SocialBlock.Icon
      src={googleIcon}
      onClick={onButtonClick}
      alt="google oauth"
    />
  );
};

export default GoogleLogin;
