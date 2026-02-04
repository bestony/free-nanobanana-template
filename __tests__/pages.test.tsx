import { render, screen } from "@testing-library/react";

import FaqPage from "@/app/faq/page";
import GalleryPage from "@/app/gallery/page";
import Home from "@/app/page";
import PricingPage from "@/app/pricing/page";
import ShowcasePage from "@/app/showcase/page";

jest.mock("@/app/components/Navbar", () => {
  function MockNavbar() {
    return <div data-testid="navbar" />;
  }

  MockNavbar.displayName = "Navbar";

  return MockNavbar;
});

jest.mock("@/app/components/Footer", () => {
  function MockFooter() {
    return <div data-testid="footer" />;
  }

  MockFooter.displayName = "Footer";

  return MockFooter;
});

jest.mock("@/app/components/Hero", () => {
  function MockHero() {
    return <div data-testid="hero" />;
  }

  MockHero.displayName = "Hero";

  return MockHero;
});

jest.mock("@/app/components/Generator", () => {
  function MockGenerator() {
    return <div data-testid="generator" />;
  }

  MockGenerator.displayName = "Generator";

  return MockGenerator;
});

jest.mock("@/app/components/Gallery", () => {
  function MockGallery() {
    return <div data-testid="gallery" />;
  }

  MockGallery.displayName = "Gallery";

  return MockGallery;
});

jest.mock("@/app/components/CoreFeatures", () => {
  function MockCoreFeatures() {
    return <div data-testid="core-features" />;
  }

  MockCoreFeatures.displayName = "CoreFeatures";

  return MockCoreFeatures;
});

jest.mock("@/app/components/Testimonials", () => {
  function MockTestimonials() {
    return <div data-testid="testimonials" />;
  }

  MockTestimonials.displayName = "Testimonials";

  return MockTestimonials;
});

jest.mock("@/app/components/Pricing", () => {
  function MockPricing() {
    return <div data-testid="pricing" />;
  }

  MockPricing.displayName = "Pricing";

  return MockPricing;
});

jest.mock("@/app/components/FaqSection", () => {
  function MockFaqSection() {
    return <div data-testid="faq" />;
  }

  MockFaqSection.displayName = "FaqSection";

  return MockFaqSection;
});

jest.mock("@/app/components/GalleryWall", () => {
  function MockGalleryWall() {
    return <div data-testid="gallery-wall" />;
  }

  MockGalleryWall.displayName = "GalleryWall";

  return MockGalleryWall;
});

jest.mock("@/app/components/ShowcaseGrid", () => {
  function MockShowcaseGrid() {
    return <div data-testid="showcase" />;
  }

  MockShowcaseGrid.displayName = "ShowcaseGrid";

  return MockShowcaseGrid;
});

describe("pages", () => {
  it("renders the home page sections", () => {
    const { container } = render(<Home />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    const main = container.querySelector("main");
    expect(main).toHaveClass("pt-20");
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("generator")).toBeInTheDocument();
    expect(screen.getByTestId("gallery")).toBeInTheDocument();
    expect(screen.getByTestId("core-features")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials")).toBeInTheDocument();
    expect(screen.getByTestId("pricing")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the FAQ page", () => {
    const { container } = render(<FaqPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveClass("pt-20");
    expect(screen.getByTestId("faq")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the gallery page", () => {
    const { container } = render(<GalleryPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveClass("pt-20");
    expect(screen.getByTestId("gallery-wall")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the pricing page", () => {
    const { container } = render(<PricingPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveClass("pt-20");
    expect(screen.getByTestId("pricing")).toBeInTheDocument();
    expect(screen.getByTestId("faq")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the showcase page", () => {
    const { container } = render(<ShowcasePage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveClass("pt-20");
    expect(screen.getByTestId("showcase")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
