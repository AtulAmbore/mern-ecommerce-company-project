import { render } from "@testing-library/react";
import { ProductCardSkeleton } from "../ProductCardSkeleton";

/*
This component is still UI-only, but it contains multiple skeleton elements including the 5 rating stars.
So our test will check a few structural things.

Your component has:

root container
animated skeleton (animate-pulse)
5 rating placeholders
*/

/*
3️⃣ What These Tests Verify
Test 1
expect(root).toHaveClass("animate-pulse")

Ensures the skeleton loading animation exists.

Test 2

Your component:

[...Array(5)].map(...)

So the test verifies 5 rating placeholders exist.
*/

/*
5️⃣ Small Professional Improvement (Optional)

To make tests more stable, you could add:

data-testid="rating-star"

Example:

<div key={i} data-testid="rating-star" className="h-4 w-4 bg-gray-200 rounded" />

Then test becomes cleaner:

screen.getAllByTestId("rating-star")

But your current version is fine.
*/

describe("ProductCardSkeleton Component", () => {
  test("renders skeleton container", () => {
    const { container } = render(<ProductCardSkeleton />);

    const root = container.firstChild;

    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("animate-pulse");
  });

  test("renders 5 rating star placeholders", () => {
    const { container } = render(<ProductCardSkeleton />);

    const stars = container.querySelectorAll(".h-4.w-4.bg-gray-200.rounded");

    expect(stars.length).toBe(5);
  });
});
