export class ActionSignIn {
  static signInPressed(payload: { email: string; password: string }) {
    return new SignInSignInPressed(payload);
  }
}

export class SignInSignInPressed {
  static readonly type = '[sign-in] sign-in';

  constructor(public payload: { email: string; password: string }) {}
}
