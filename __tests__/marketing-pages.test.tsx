import { render, screen } from "@testing-library/react";

import FaqPage from "@/app/faq/page";
import GalleryPage from "@/app/gallery/page";
import Home from "@/app/page";
import PricingPage from "@/app/pricing/page";
import ShowcasePage from "@/app/showcase/page";

jest.mock("@/app/components/Navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar" />,
}));

jest.mock("@/app/components/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock("@/app/components/Hero", () => ({
  __esModule: true,
  default: () => <div data-testid="hero" />,
}));

jest.mock("@/app/components/Generator", () => ({
  __esModule: true,
  default: () => <div data-testid="generator" />,
}));

jest.mock("@/app/components/Gallery", () => ({
  __esModule: true,
  default: () => <div data-testid="gallery" />,
}));

jest.mock("@/app/components/CoreFeatures", () => ({
  __esModule: true,
  default: () => <div data-testid="core-features" />,
}));

jest.mock("@/app/components/Testimonials", () => ({
  __esModule: true,
  default: () => <div data-testid="testimonials" />,
}));

jest.mock("@/app/components/Pricing", () => ({
  __esModule: true,
  default: () => <div data-testid="pricing" />,
}));

jest.mock("@/app/components/FaqSection", () => ({
  __esModule: true,
  default: () => <div data-testid="faq-section" />,
}));

jest.mock("@/app/components/GalleryWall", () => ({
  __esModule: true,
  default: () => <div data-testid="gallery-wall" />,
}));

jest.mock("@/app/components/ShowcaseGrid", () => ({
  __esModule: true,
  default: () => <div data-testid="showcase-grid" />,
}));

describe("Marketing pages", () => {
  it("renders the home page composition", () => {
    render(<Home />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("generator")).toBeInTheDocument();
    expect(screen.getByTestId("gallery")).toBeInTheDocument();
    expect(screen.getByTestId("core-features")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials")).toBeInTheDocument();
    expect(screen.getByTestId("pricing")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the pricing page composition", () => {
    render(<PricingPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("pricing")).toBeInTheDocument();
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the FAQ page composition", () => {
    render(<FaqPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the gallery page composition", () => {
    render(<GalleryPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-wall")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the showcase page composition", () => {
    render(<ShowcasePage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("showcase-grid")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
