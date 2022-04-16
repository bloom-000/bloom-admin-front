export class ActionNewCategory {
  static savePressed(payload: NewCategorySavePressedPayload) {
    return new NewCategorySavePressed(payload);
  }
}

interface NewCategorySavePressedPayload {
  name: string;
  description: string;
}
export class NewCategorySavePressed {
  static readonly type = '[new-category] save';

  constructor(public payload: NewCategorySavePressedPayload) {}
}
