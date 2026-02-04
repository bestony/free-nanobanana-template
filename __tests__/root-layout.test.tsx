import type { ReactElement, ReactNode } from "react";

import RootLayout, { metadata } from "@/app/layout";

jest.mock("next/font/google", () => ({
  Inter: () => ({ variable: "mock-font" }),
}));

jest.mock("@/app/providers", () => ({
  Providers: ({ children }: { children: ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("exposes metadata", () => {
    expect(metadata.title).toBe("Nanobanana - AI Creative Platform");
    expect(metadata.description).toContain("Nanobanana");
  });

  it("renders html/body structure with providers", () => {
    const element = RootLayout({
      children: <div>Child content</div>,
    }) as ReactElement;

    expect(element.type).toBe("html");
    expect(element.props.lang).toBe("en");

    const body = element.props.children as ReactElement;

    expect(body.type).toBe("body");
    expect(body.props.className).toContain("bg-white");
    expect(body.props.className).toContain("text-nano-text");
    expect(body.props.className).toContain("font-sans");
    expect(body.props.className).toContain("antialiased");
    expect(body.props.className).toContain("mock-font");

    const providers = body.props.children as ReactElement;
    const content = providers.props.children as ReactElement;

    expect(content.props.children).toBe("Child content");
  });
});
