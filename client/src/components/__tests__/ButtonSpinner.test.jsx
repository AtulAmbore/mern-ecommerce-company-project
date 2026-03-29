import { render } from "@testing-library/react";
import { ButtonSpinner } from "../ButtonSpinner";

/*
5️⃣ Optional Improvement (Industry Practice)

If you want more stable tests, you can add a data-testid.

Example improvement in your component:

<div
  data-testid="button-spinner"
  className="border-2 border-gray-900 border-t-transparent rounded-full w-5 h-5 animate-spin mx-auto"
/>

Then test becomes:

const spinner = screen.getByTestId("button-spinner");

This is very common in real projects.
*/

/*
3️⃣ What These Tests Verify
Test 1

Checks that the spinner renders correctly.

container.firstChild

This selects the <div> spinner element.

Test 2

Checks that the Tailwind animation class exists.

expect(spinner).toHaveClass("animate-spin");

This ensures the spinner actually spins.
*/

describe("ButtonSpinner Component", () => {
  test("renders spinner element", () => {
    const { container } = render(<ButtonSpinner />);

    const spinner = container.firstChild;

    expect(spinner).toBeInTheDocument();
  });

  test("spinner has animation class", () => {
    const { container } = render(<ButtonSpinner />);

    const spinner = container.firstChild;

    expect(spinner).toHaveClass("animate-spin");
  });
});
