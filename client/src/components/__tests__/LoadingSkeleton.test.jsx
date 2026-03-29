import { render, screen } from "@testing-library/react";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { ProductCardSkeleton } from "../ProductCardSkeleton";
import { vi } from "vitest";

/*
Your component:

<ProductCardSkeleton />

is rendered 10 times.

So our test should verify:

1️⃣ The component renders
2️⃣ It renders 10 skeleton cards
*/

/*
3️⃣ Why We Mock ProductCardSkeleton

Your component uses:

<ProductCardSkeleton />

But we are testing LoadingSkeleton, not the child component.

So we mock it:

vi.mock("./ProductCardSkeleton")

This is standard practice in real projects.

It keeps tests:

faster
isolated
predictable
4️⃣ What This Test Verifies

Your code:

Array.from({ length: 10 })

So the test checks:

expect(skeletons).toHaveLength(10)

Meaning:

✔ 10 skeleton components rendered.
*/

// Mock ProductCardSkeleton
vi.mock("./ProductCardSkeleton", () => ({
  ProductCardSkeleton: () => <div data-testid="product-skeleton" />,
}));

describe("LoadingSkeleton Component", () => {
  test("renders 10 skeleton cards", () => {
    render(<LoadingSkeleton />);

    const skeletons = screen.getAllByTestId("product-skeleton");

    expect(skeletons).toHaveLength(10);
  });
});
