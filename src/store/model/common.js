import { thunk } from "easy-peasy";

const thunks = {
  uploadFile: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.uploadFile(payload);
    return data;
  }),
  removeFile: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.removeFile(payload);
    return data;
  })
};

export const commonModel = {
  ...thunks
};
