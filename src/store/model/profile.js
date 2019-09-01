import { action, thunk } from "easy-peasy";

const DEFAULT_AVATAR_PATH = `/upload/ava_default.png`;

const thunks = {
  updateAvatar: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const { path } = await actions.uploadFile(payload);
      const { avatarPath } = await Api.updateUserProfile(profile.id, {
        avatarPath: path
      });
      actions.updateProfileAction({ avatarPath });
      return avatarPath;
    }
  ),
  deleteAvatar: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const [, { avatarPath }] = await Promise.all([
        actions.removeFile(payload),
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
    profile: { ...state.profile, ...payload }
  }))
};

export const profileModel = {
  profile: {
    email: "",
    username: "",
    id: "",
    categories: [],
    friends: [],
    avatarPath: ""
  },
  ...thunks,
  ...actions
};
