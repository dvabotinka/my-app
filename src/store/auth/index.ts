import { 
  types, 
  Instance
} from 'mobx-state-tree'; 

const UserLoginModel = types.model("UserLogin", {
  login: types.string,
  password: types.string
});

const LoginModel = types.model("Login", {
  users: types.array(UserLoginModel)
});

const AuthRootModel = types.model("AuthRoot", {
  login: LoginModel
});

export { AuthRootModel }

export type AuthRoot = Instance<typeof AuthRootModel>
export type Login = Instance<typeof LoginModel>
export type UserLogin = Instance<typeof UserLoginModel>