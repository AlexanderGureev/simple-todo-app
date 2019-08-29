import React, { useState, useLayoutEffect, useRef } from "react";
import { useStoreActions } from "easy-peasy";
import { message } from "antd";
import vkIcon from "./img/vk-soc.svg";
import { Form } from "./styles";
import SocialService from "../../services/social";

const VKLogin = ({
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

  const provider = "vk";
  const loadingIndicator = useRef(() => {});
  const socialService = new SocialService(requestCodeUrl);

  const setLoadingIndicator = () => {
    loadingIndicator.current = message.open("Signing in");
  };
  const clearLoadingIndicator = () => loadingIndicator.current();

  useLayoutEffect(() => {
    loading ? setLoadingIndicator() : clearLoadingIndicator();
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
    const token = await socialService.getRequestToken();

    const params = {
      response_type: rest.responseType || "code",
      scope: rest.scope || ["email", "photos"].join(","),
      client_id: clientId,
      redirect_uri: redirectUri,
      state: token,
      display: "page",
      v: "5.92"
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
    }
  };

  const failure = error => {
    console.log(error.message || error);
  };

  return (
    <Form.SocialBlock.Icon
      src={vkIcon}
      onClick={onButtonClick}
      alt="vk oauth"
    />
  );
};

export default VKLogin;
