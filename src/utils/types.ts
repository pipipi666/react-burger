export interface IData {
  readonly _id: string;
  readonly name: string;
  readonly type: "bun" | "sauce" | "main";
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  dropId?: number;
  count?: number;
}

export type TIngredientsThunk = {
  data: Array<IData>;
};

export type TOrderThunk = {
  order: TOrder;
};

export interface ILogin {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
  success: boolean;
}

export interface IForm {
  [name: string]: string;
}

export interface IOptions {
  method?: "POST" | "PATCH";
  mode?: "cors";
  credentials?: "same-origin";
  headers: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
  body?: BodyInit;
}

export interface ILocationState {
  from: string;
}

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: "done" | "pending" | "created";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  total?: number;
};

export type TIngredientsState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: Array<IData>;
  constructorIngredients: Array<IData>;
  lastIndexConstructor: number;
  currentIngredient?: IData;
  orderRequest: boolean;
  orderFailed: boolean;
  order?: TOrder;
  sum: number;
  orders?: Array<TOrder>;
  isSocket: boolean;
  isSocketError: boolean;
  ordersTotal: number;
  ordersTotalToday: number;
  currentOrder?: TOrder;
};

export type TAuthState = {
  formLogin: IForm;
  formRegister: IForm;
  formForgotPassword: IForm;
  formResetPassword: IForm;
  user: IForm;
  formProfile: IForm;
  loginRequest: boolean;
  loginFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;
  getProfileRequest: boolean;
  getProfileFailed: boolean;
  setProfileRequest: boolean;
  setProfileFailed: boolean;
  tokenRequest: boolean;
  tokenFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  logoutSuccess: boolean;
  error: string;
};

export type TError = { code: string; message: string };
