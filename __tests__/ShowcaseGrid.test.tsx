import { act, fireEvent, render, screen } from "@testing-library/react";

import ShowcaseGrid from "@/app/components/ShowcaseGrid";

describe("ShowcaseGrid", () => {
  const setClipboard = (clipboard: Clipboard | undefined) => {
    Object.defineProperty(window.navigator, "clipboard", {
      value: clipboard,
      configurable: true,
      writable: true,
    });
  };

  const originalExecCommand = document.execCommand;

  afterEach(() => {
    jest.useRealTimers();
    setClipboard(undefined);
    if (originalExecCommand) {
      document.execCommand = originalExecCommand;
    } else {
      // @ts-expect-error cleanup for jsdom
      delete document.execCommand;
    }
  });

  it("copies prompts using the clipboard API", async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    document.execCommand = jest.fn().mockReturnValue(false);

    render(<ShowcaseGrid />);

    const card = screen.getAllByRole("button")[0];
    await act(async () => {
      fireEvent.click(card);
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalled();
    expect(screen.getByText("Copied")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1600);
    });
    expect(screen.getAllByText("Copy").length).toBeGreaterThan(0);
  });

  it("falls back to execCommand when clipboard fails", async () => {
    setClipboard(undefined);
    const execCommand = jest.fn().mockReturnValue(true);
    document.execCommand = execCommand;

    render(<ShowcaseGrid />);

    await act(async () => {
      fireEvent.click(screen.getAllByRole("button")[1]);
      await Promise.resolve();
    });

    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });

  it("keeps copy badge when fallback fails", async () => {
    setClipboard(undefined);
    document.execCommand = jest.fn().mockReturnValue(false);

    render(<ShowcaseGrid />);

    await act(async () => {
      fireEvent.click(screen.getAllByRole("button")[2]);
      await Promise.resolve();
    });

    expect(screen.getAllByText("Copy").length).toBeGreaterThan(0);
  });

  it("returns false when fallback throws", async () => {
    setClipboard(undefined);
    document.execCommand = jest.fn(() => {
      throw new Error("clipboard blocked");
    });

    render(<ShowcaseGrid />);

    await act(async () => {
      fireEvent.click(screen.getAllByRole("button")[0]);
      await Promise.resolve();
    });

    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
  });

  it("clears existing timers when copying again", async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    const clearSpy = jest.spyOn(window, "clearTimeout");

    render(<ShowcaseGrid />);

    await act(async () => {
      fireEvent.click(screen.getAllByRole("button")[0]);
      await Promise.resolve();
    });
    await act(async () => {
      fireEvent.click(screen.getAllByRole("button")[1]);
      await Promise.resolve();
    });

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it("clears timers on unmount", async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    const clearSpy = jest.spyOn(window, "clearTimeout");

    const { unmount } = render(<ShowcaseGrid />);

    await act(async () => {
      fireEvent.click(screen.getAllByRole("button")[0]);
      await Promise.resolve();
    });
    unmount();

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
