import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import GenerationsPage from "@/app/account/generations/page";

describe("GenerationsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads and shows the empty state", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    global.fetch = fetchMock as typeof global.fetch;

    render(<GenerationsPage />);

    expect(screen.getByText("Loading generations...")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(
          "No generations yet. Start creating to build your history.",
        ),
      ).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/generations");
  });

  it("renders generation records", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: "gen-1",
            prompt: "A neon banana studio",
            imageUrl: "https://example.com/banana.png",
            createdAt: "2024-01-01T12:00:00Z",
          },
        ],
      }),
    });
    global.fetch = fetchMock as typeof global.fetch;

    render(<GenerationsPage />);

    await waitFor(() => {
      expect(screen.getByText("A neon banana studio")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("img", { name: "Generated output" }),
    ).toHaveAttribute("src", "https://example.com/banana.png");
    expect(screen.getByRole("link", { name: "Download" })).toHaveAttribute(
      "download",
      "nanobanana-gen-1.png",
    );
  });

  it("shows errors when the API call fails", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Unable to load generations." }),
    });
    global.fetch = fetchMock as typeof global.fetch;

    render(<GenerationsPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Unable to load generations."),
      ).toBeInTheDocument();
    });
  });

  it("validates date range and disables apply", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    global.fetch = fetchMock as typeof global.fetch;

    render(<GenerationsPage />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText("From"), {
      target: { value: "2024-02-01" },
    });
    fireEvent.change(screen.getByLabelText("To"), {
      target: { value: "2024-01-01" },
    });

    expect(
      screen.getByText(
        "Please make sure the end date is after the start date.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  });

  it("applies filters and clears them", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      });
    global.fetch = fetchMock as typeof global.fetch;

    render(<GenerationsPage />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText("From"), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText("To"), {
      target: { value: "2024-01-31" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Apply" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/generations?from=2024-01-01&to=2024-01-31",
      ),
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith("/api/generations"),
    );

    expect(screen.getByLabelText("From")).toHaveValue("");
    expect(screen.getByLabelText("To")).toHaveValue("");
  });
});
