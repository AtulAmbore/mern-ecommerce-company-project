import { RouterPage } from "../RouterPage";

describe("RouterPage", () => {
  test("router is defined", () => {
    expect(RouterPage).toBeDefined();
  });

  test("root route exists", () => {
    const routes = RouterPage.routes;

    expect(routes[0].path).toBe("/");
  });

  test("has index route for HomePage", () => {
    const rootChildren = RouterPage.routes[0].children;

    const indexRoute = rootChildren.find((route) => route.index === true);

    expect(indexRoute).toBeDefined();
  });

  test("has /form route", () => {
    const rootChildren = RouterPage.routes[0].children;

    const formRoute = rootChildren.find((route) => route.path === "/form");

    expect(formRoute).toBeDefined();
  });

  test("has /products route", () => {
    const rootChildren = RouterPage.routes[0].children;

    const productRoute = rootChildren.find(
      (route) => route.path === "/products",
    );

    expect(productRoute).toBeDefined();
  });
});
