import api from "./api";

export default class SocialService {
  constructor(requestCodeUrl) {
    this.requestCodeUrl = requestCodeUrl;
  }

  getHeaders = () => {
    const headers = Object.assign({}, this.props.customHeaders || {});
    headers["Content-Type"] = "application/json";
    return headers;
  };

  getRequestToken = async () => {
    try {
      const token = await api.getCSRFTokenApi();
      if (!token) throw new Error("Token request error.");

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getCode = async (queryParams, success, failure) => {
    try {
      const popup = this.openPopup();
      popup.location = `${this.requestCodeUrl}?${queryParams}`;
      this.polling(popup, success, failure);
    } catch (error) {
      console.log(error);
      failure("Authorization error, try again later.");
    }
  };

  openPopup = () => {
    const w = 600;
    const h = 500;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;

    return window.open(
      "",
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };

  polling = (popup, success, failure) => {
    const polling = setInterval(() => {
      try {
        if (popup.location.href !== "about:blank") {
          if (!popup || popup.closed || popup.closed === undefined) {
            clearInterval(polling);
            failure("Popup has been closed by user");
          }

          const closeDialog = () => {
            clearInterval(polling);
            popup.close();
          };

          if (popup.location.href) {
            // const query = new URLSearchParams(popup.location.hash.slice(1));
            // const accessToken = query.get("access_token");
            // const expiresIn = query.get("expires_in");
            const [, lastParams] = popup.location.href.split("?");
            const query = new URLSearchParams(lastParams);
            const code = query.get("code");
            const state = query.get("state");

            if (!code || !state) {
              throw new Error(
                "OAuth redirect has occurred but no query or hash parameters were found."
              );
            }

            closeDialog();
            return success(code, state);
          }
          return failure(
            "OAuth redirect has occurred but no query or hash parameters were found."
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    }, 500);
  };
}
