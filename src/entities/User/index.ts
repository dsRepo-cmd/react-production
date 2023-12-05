import { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData";
import { getUserInited } from "./model/selectors/getUserInited/getUserInited";
import { userActions, userReducer } from "./model/slice/userSlice";
import { UserSchema, User } from "./model/types/user";

export {
  userReducer,
  userActions,
  UserSchema,
  User,
  getUserAuthData,
  getUserInited,
};
