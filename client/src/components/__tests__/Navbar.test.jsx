/*
It uses:

✅ Redux
✅ React Router
✅ Thunk dispatch
✅ UI state
✅ icons
✅ conditional rendering

In real companies we do not test everything in one file. We test core behaviors only.

So we will test:

1️⃣ Navbar renders
2️⃣ Navigation links exist
3️⃣ Username appears
4️⃣ Cart count appears
5️⃣ Cart opens when clicking icon

We will NOT test every thunk here (that belongs to integration tests).
*/
/*
2️⃣ Mock Required Dependencies

Your component uses many external things:

redux
router
toast
icons
thunks

So we mock them.
*/
/*
4️⃣ What This Test Actually Verifies
Navigation links exist
Home
Form
Products
Username renders

Your code:

WELCOME, {user.name}

Test:

WELCOME, Atul
Cart count appears
{cartProducts?.length ?? 0}

Mock state returns 0.

Logout dropdown works

User clicks profile image → dropdown opens.

5️⃣ Why We Mock Redux Store

Instead of using the real store, we create a fake test store:

configureStore({
 reducer:{}
})

This makes tests:

faster
deterministic
independent
*/
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Navbar } from "../Navbar";
import { vi } from "vitest";

// mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// fake redux reducers
const mockStore = configureStore({
  reducer: {
    authKey: () => ({
      loginState: {
        isLogin: true,
        isLoading: false,
        isError: false,
        error: null,
        user: { name: "Atul" },
      },
    }),
    cartKey: () => ({
      cartState: {
        cartProducts: [],
      },
    }),
  },
});

function renderNavbar() {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Navbar Component", () => {
  test("renders navigation links", () => {
    renderNavbar();

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/form/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });

  test("shows logged in username", () => {
    renderNavbar();

    expect(screen.getByText(/welcome, atul/i)).toBeInTheDocument();
  });

  test("shows cart count", () => {
    renderNavbar();

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("opens logout dropdown when profile clicked", async () => {
    renderNavbar();

    const profileImage = screen.getByRole("img");

    await userEvent.click(profileImage);

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
