import { AppStore } from "../AppStore";

describe("AppStore", () => {
  test("store is defined", () => {
    expect(AppStore).toBeDefined();
  });

  test("store has dispatch function", () => {
    expect(typeof AppStore.dispatch).toBe("function");
  });

  test("store has getState function", () => {
    expect(typeof AppStore.getState).toBe("function");
  });

  test("store contains authKey reducer", () => {
    const state = AppStore.getState();
    expect(state).toHaveProperty("authKey");
  });

  test("store contains productKey reducer", () => {
    const state = AppStore.getState();
    expect(state).toHaveProperty("productKey");
  });

  test("store contains cartKey reducer", () => {
    const state = AppStore.getState();
    expect(state).toHaveProperty("cartKey");
  });
});
