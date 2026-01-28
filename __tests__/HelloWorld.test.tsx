import { render, screen } from "@testing-library/react";
import { HelloWorld } from "@/app/components/HelloWorld";

describe("HelloWorld", () => {
  it("renders the default greeting", () => {
    render(<HelloWorld />);

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("renders a custom name", () => {
    render(<HelloWorld name="Bun" />);

    expect(screen.getByText("Hello, Bun!")).toBeInTheDocument();
  });
});
