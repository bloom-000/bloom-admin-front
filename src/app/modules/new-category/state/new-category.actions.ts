export class ActionNewCategory {
  static savePressed(payload: NewCategorySavePressedPayload) {
    return new NewCategorySavePressed(payload);
  }

  static initialCategoryIdLoaded(
    payload: NewCategoryInitialCategoryIdLoadedPayload,
  ) {
    return new NewCategoryInitialCategoryIdLoaded(payload);
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

interface NewCategoryInitialCategoryIdLoadedPayload {
  categoryId: string;
}
export class NewCategoryInitialCategoryIdLoaded {
  static readonly type = '[new-category] initial category id loaded';

  constructor(
    public readonly payload: NewCategoryInitialCategoryIdLoadedPayload,
  ) {}
}
