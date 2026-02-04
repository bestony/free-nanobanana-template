import { renderHook, waitFor, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

type ChangeListener = (event: MediaQueryListEvent) => void;

describe("useIsMobile", () => {
  const originalMatchMedia = window.matchMedia;
  let changeListener: ChangeListener | null = null;
  let addEventListenerMock: jest.Mock;
  let removeEventListenerMock: jest.Mock;

  const setupMatchMedia = () => {
    changeListener = null;
    addEventListenerMock = jest.fn(
      (event: string, listener: ChangeListener) => {
        if (event === "change") {
          changeListener = listener;
        }
      },
    );
    removeEventListenerMock = jest.fn(
      (event: string, listener: ChangeListener) => {
        if (event === "change" && changeListener === listener) {
          changeListener = null;
        }
      },
    );

    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      media: query,
      matches: window.innerWidth < 768,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    }));
  };

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1024,
    });
    setupMatchMedia();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("returns true when the window width is below the breakpoint", async () => {
    window.innerWidth = 500;

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("returns false when the window width is at or above the breakpoint", async () => {
    window.innerWidth = 1024;

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("updates when the media query changes", async () => {
    window.innerWidth = 1024;

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    act(() => {
      window.innerWidth = 600;
      changeListener?.(new Event("change") as MediaQueryListEvent);
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("removes the listener on unmount", async () => {
    const { unmount } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(addEventListenerMock).toHaveBeenCalledTimes(1);
    });

    const [, listener] = addEventListenerMock.mock.calls[0];

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith("change", listener);
  });
});
