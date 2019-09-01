import { action, thunk } from "easy-peasy";

const DEFAULT_AVATAR_PATH = `/upload/ava_default.png`;

const thunks = {
  updateAvatar: thunk(
    async (
      actions,
      payload,
      { injections: { Api }, getState, getStoreActions }
    ) => {
      const { profile } = getState();
      const { uploadFile } = getStoreActions().file;

      const { path } = await uploadFile(payload);
      const { avatarPath } = await Api.updateUserProfile(profile.id, {
        avatarPath: path
      });

      actions.updateProfileAction({ avatarPath });
      return avatarPath;
    }
  ),
  deleteAvatar: thunk(
    async (
      actions,
      payload,
      { injections: { Api }, getState, getStoreActions }
    ) => {
      const { profile } = getState();
      const { removeFile } = getStoreActions().file;

      const [, { avatarPath }] = await Promise.all([
        removeFile(payload),
        Api.updateUserProfile(profile.id, { avatarPath: DEFAULT_AVATAR_PATH })
      ]);

      actions.updateProfileAction({ avatarPath });
    }
  ),
  getUserProfile: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.getUserProfile();
    return user;
  })
};

const actions = {
  updateProfileAction: action((state, payload) => ({
    ...state,
    ...payload
  }))
};

export const profileModel = {
  id: "",
  email: "",
  username: "",
  categories: [],
  friends: [],
  avatarPath: "",
  ...thunks,
  ...actions
};
