/*
Your component has:

props: isAdmin
function: setIsAdmin
button click toggles admin state

So our tests should verify:

1️⃣ Component renders
2️⃣ Button click calls setIsAdmin
3️⃣ Correct styling based on isAdmin
*/

/*
3️⃣ What These Tests Check
Test 1

Checks the Admin label renders.

screen.getByText(/admin/i)
Test 2

Simulates user click.

await userEvent.click(button)

Then verifies:

expect(mockSetIsAdmin).toHaveBeenCalled()
Test 3

When:

isAdmin = true

The button should have:

bg-blue-600
Test 4

When:

isAdmin = false

Button should have:

bg-gray-400
4️⃣ Why We Use userEvent Instead of fireEvent

userEvent simulates real user behaviour.

Example:

await userEvent.click(button)

Companies prefer userEvent.
*/

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminToggle } from "../AdminToggle";

describe("AdminToggle Component", () => {
  test("renders Admin label", () => {
    render(<AdminToggle isAdmin={false} setIsAdmin={() => {}} />);

    const label = screen.getByText(/admin/i);

    expect(label).toBeInTheDocument();
  });

  test("calls setIsAdmin when button is clicked", async () => {
    const mockSetIsAdmin = vi.fn();

    render(<AdminToggle isAdmin={false} setIsAdmin={mockSetIsAdmin} />);

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(mockSetIsAdmin).toHaveBeenCalled();
  });

  test("applies correct style when admin is true", () => {
    render(<AdminToggle isAdmin={true} setIsAdmin={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-blue-600");
  });

  test("applies correct style when admin is false", () => {
    render(<AdminToggle isAdmin={false} setIsAdmin={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-gray-400");
  });
});
