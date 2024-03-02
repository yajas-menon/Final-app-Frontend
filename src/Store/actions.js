import * as userSliceActions from "./Slices/userSlice.js";

const actions = {
  user: {
    set: userSliceActions.updateUser,
    clear: userSliceActions.clearUser,
  },
};

export default actions;
