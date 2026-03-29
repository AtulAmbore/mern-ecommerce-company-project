import { render, screen } from "@testing-library/react";
import { Loading } from "../Loading";

/*
6️⃣ Small Improvement (Optional but Professional)

If you want better testing practice, you can slightly improve the component:

<div data-testid="spinner" className="loader ..."></div>

Then test like this:

const spinner = screen.getByTestId("spinner");

But your current version works fine.
*/

/*
3️⃣ What This Test Checks
Test 1
screen.getByText(/loading/i)

Checks that:

Loading...

is visible.

Test 2
document.querySelector(".loader")

Checks that the spinner div exists.
*/

describe("Loading Component", () => {
  test("renders loading text", () => {
    render(<Loading />);

    const loadingText = screen.getByText(/loading/i);

    expect(loadingText).toBeInTheDocument();
  });

  test("renders spinner element", () => {
    render(<Loading />);

    const spinner = document.querySelector(".loader");
    // const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });
});
