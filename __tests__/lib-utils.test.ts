import { cn } from "@/lib/utils";

describe("lib/utils", () => {
  it("merges tailwind classes and skips falsy values", () => {
    const result = cn("p-2", false, undefined, "p-4", ["text-sm", "px-2"], {
      hidden: true,
    });

    expect(result).toContain("p-4");
    expect(result).not.toContain("p-2");
    expect(result).toContain("text-sm");
    expect(result).toContain("px-2");
    expect(result).toContain("hidden");
  });
});
