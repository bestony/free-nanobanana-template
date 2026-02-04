import type { ReactElement, ReactNode } from "react";

import RootLayout from "@/app/layout";

jest.mock("next/font/google", () => ({
  Inter: () => ({
    variable: "--font-inter",
  }),
}));

jest.mock("@/app/providers", () => ({
  Providers: ({ children }: { children: ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("wraps content with Providers and sets html/body attributes", () => {
    const element = RootLayout({
      children: <div>Layout content</div>,
    }) as ReactElement;

    expect(element.type).toBe("html");
    expect(element.props.lang).toBe("en");

    const body = element.props.children as ReactElement;

    expect(body.type).toBe("body");
    expect(body.props.className).toContain("bg-white");
    expect(body.props.className).toContain("--font-inter");

    const providers = body.props.children as ReactElement;
    const content = providers.props.children as ReactElement;

    expect(content.props.children).toBe("Layout content");
  });
});
