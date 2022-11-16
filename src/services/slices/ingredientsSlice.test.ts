import ingredientsReducer, {
  addIngredient,
  deleteCurrentIngredient,
  deleteCurrentOrder,
  deleteIngredient,
  fetchIngredients,
  fetchOrder,
  getCurrentIngredient,
  getCurrentOrder,
  initialState,
  setIngredients,
  total,
} from "services/slices/ingredientsSlice";
import { IData, TOrder } from "utils/types";

const ingredientsMock: IData[] = [
  {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "60666c42cc7b410027a1a9b5",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
  {
    _id: "60666c42cc7b410027a1a9b7",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0,
  },
];

const ingredientMock = ingredientsMock[0];

const orderMock: TOrder = {
  _id: "id",
  ingredients: ["1", "2", "3"],
  status: "done",
  name: "order",
  createdAt: "",
  updatedAt: "",
  number: 123,
};

describe("Redux ingredients store", () => {
  test("Should return the initial state", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
  });

  test("Should check addIngredient action", () => {
    const expectedAction = {
      type: addIngredient.type,
      payload: ingredientMock,
    };
    const expectedState = {
      ...initialState,
      lastIndexConstructor: 1,
      constructorIngredients: [
        ...initialState.constructorIngredients,
        {
          ...ingredientMock,
          dropId: 1,
        },
      ],
    };

    const action = addIngredient(ingredientMock);

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check deleteIngredient action", () => {
    const expectedAction = {
      type: deleteIngredient.type,
      payload: { ...ingredientMock, dropId: 1 },
    };
    const startState = {
      ...initialState,
      lastIndexConstructor: 1,
      constructorIngredients: [
        ...initialState.constructorIngredients,
        {
          ...ingredientMock,
          dropId: 1,
        },
      ],
    };
    const expectedState = {
      ...startState,
      constructorIngredients: [],
    };

    const deleteAction = deleteIngredient({ ...ingredientMock, dropId: 1 });

    expect(deleteAction).toEqual(expectedAction);
    expect(ingredientsReducer(startState, deleteAction)).toEqual(expectedState);
  });

  test("Should check getCurrentIngredient action", () => {
    const expectedAction = {
      type: getCurrentIngredient.type,
      payload: ingredientMock,
    };
    const expectedState = {
      ...initialState,
      currentIngredient: ingredientMock,
    };

    const action = getCurrentIngredient(ingredientMock);

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check deleteCurrentIngredient action", () => {
    const expectedAction = {
      type: deleteCurrentIngredient.type,
    };
    const startState = {
      ...initialState,
      currentIngredient: ingredientMock,
    };
    const expectedState = {
      ...initialState,
      currentIngredient: undefined,
    };

    const action = deleteCurrentIngredient();

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(startState, action)).toEqual(expectedState);
  });

  test("Should check getCurrentOrder action", () => {
    const expectedAction = {
      type: getCurrentOrder.type,
      payload: orderMock,
    };
    const expectedState = {
      ...initialState,
      currentOrder: orderMock,
    };

    const action = getCurrentOrder(orderMock);

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check deleteCurrentOrder action", () => {
    const expectedAction = {
      type: deleteCurrentOrder.type,
    };
    const startState = {
      ...initialState,
      currentOrder: orderMock,
    };
    const expectedState = {
      ...initialState,
      currentOrder: undefined,
    };

    const action = deleteCurrentOrder();

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(startState, action)).toEqual(expectedState);
  });

  test("Should check setIngredients action", () => {
    const expectedAction = {
      type: setIngredients.type,
      payload: ingredientsMock,
    };
    const expectedState = {
      ...initialState,
      constructorIngredients: ingredientsMock,
    };

    const action = setIngredients(ingredientsMock);

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check total action", () => {
    const expectedAction = {
      type: total.type,
    };
    const mockSum =
      ingredientsMock[0].price * 2 +
      ingredientsMock[1].price +
      ingredientsMock[2].price;
    const startState = {
      ...initialState,
      constructorIngredients: ingredientsMock,
    };
    const expectedState = {
      ...startState,
      sum: mockSum,
    };

    const action = total();

    expect(action).toEqual(expectedAction);
    expect(ingredientsReducer(startState, action)).toEqual(expectedState);
  });

  test("Should check fetchIngredients pending action", () => {
    const action = {
      type: fetchIngredients.pending.type,
    };
    const expectedState = {
      ...initialState,
      ingredientsRequest: true,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchIngredients fulfilled action", () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: { data: ingredientsMock },
    };
    const expectedState = {
      ...initialState,
      ingredients: ingredientsMock,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchIngredients error action", () => {
    const action = {
      type: fetchIngredients.rejected.type,
    };
    const expectedState = {
      ...initialState,
      ingredientsFailed: true,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchOrder pending action", () => {
    const action = {
      type: fetchOrder.pending.type,
    };
    const expectedState = {
      ...initialState,
      orderRequest: true,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchOrder fulfilled action", () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: { order: orderMock },
    };
    const expectedState = {
      ...initialState,
      order: orderMock,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  test("Should check fetchOrder error action", () => {
    const action = {
      type: fetchOrder.rejected.type,
    };
    const expectedState = {
      ...initialState,
      orderFailed: true,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });
});
