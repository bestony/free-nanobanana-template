import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names with tailwind-merge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional and object values", () => {
    expect(cn("text-sm", false && "hidden", { "font-bold": true })).toBe(
      "text-sm font-bold",
    );
  });
});
