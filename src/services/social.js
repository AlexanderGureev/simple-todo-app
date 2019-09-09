export default class SocialService {
  constructor(requestCodeUrl) {
    this.requestCodeUrl = requestCodeUrl;
  }

  encode64 = buff => {
    return window.btoa(
      new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), "")
    );
  };

  getOperationState = () => {
    const hash = crypto.getRandomValues(new Uint8Array(12));
    return this.encode64(hash);
  };

  getCode = async (queryParams, sourceState, success, failure) => {
    try {
      const popup = this.openPopup();
      popup.location = `${this.requestCodeUrl}?${queryParams}`;
      this.polling(popup, sourceState, success, failure);
    } catch (error) {
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

  polling = (popup, sourceState, success, failure) => {
    const polling = setInterval(() => {
      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
        if (popup.location.href !== "about:blank") {
          if (!popup || popup.closed || popup.closed === undefined) {
            clearInterval(polling);
            throw new Error("Popup has been closed by user");
          }

          if (popup.location.href) {
            const [, lastParams] = popup.location.href.split("?");
            const query = new URLSearchParams(lastParams);
            const code = query.get("code");
            const [state] = query.get("state").split("#");

            if (!code || !state || state !== sourceState) {
              closeDialog();
              throw new Error(
                "OAuth redirect has occurred but no query or hash parameters were found."
              );
            }

            closeDialog();
            return success(code, state);
          }
        }
        // eslint-disable-next-line no-empty
      } catch (error) {
        console.log(error.message);
        closeDialog();
        // failure(error.message);
      }
    }, 300);
  };
}
