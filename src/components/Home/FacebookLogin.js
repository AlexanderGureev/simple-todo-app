import React, { useState, useEffect, useRef } from "react";
import { useStoreActions } from "easy-peasy";
import { message } from "antd";
import { Form } from "./styles";
import SocialService from "../../services/social";
import facebookIcon from "./img/fb-soc.svg";

const FacebookLogin = ({
  requestCodeUrl = "",
  clientId = "",
  redirectUri = "",
  onFailure = () => {},
  onSuccess = () => {},
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const socialAuthorizeUserAction = useStoreActions(
    actions => actions.session.socialAuthorizeUserAction
  );

  const provider = "facebook";
  const loadingIndicator = useRef(() => {});
  const reqState = useRef(null);
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
    try {
      reqState.current = socialService.getOperationState();
      const queryParams = getParams();
      socialService.getCode(queryParams, reqState.current, success, failure);
    } catch (error) {
      failure(new Error("Auth failed"));
    }
  };

  const getParams = () => {
    if (!clientId || !redirectUri || !requestCodeUrl) {
      throw new Error("Bad params");
    }

    const params = {
      response_type: rest.responseType || "code",
      scope: rest.scope || ["email", "public_profile"].join(", "),
      client_id: clientId,
      redirect_uri: redirectUri,
      state: reqState.current,
      display: "popup"
    };

    const paramsConstructor = new URLSearchParams();
    Object.keys(params).map(key => paramsConstructor.append(key, params[key]));

    return paramsConstructor.toString();
  };

  const success = async (code, state) => {
    try {
      setLoading(true);
      await socialAuthorizeUserAction({ provider, code, state });
    } catch (error) {
      onFailure(error.message);
    } finally {
      setLoading(false);
    }
  };

  const failure = error => onFailure(error);

  return (
    <Form.SocialBlock.Icon
      src={facebookIcon}
      onClick={onButtonClick}
      alt="facebook oauth"
    />
  );
};

export default FacebookLogin;
