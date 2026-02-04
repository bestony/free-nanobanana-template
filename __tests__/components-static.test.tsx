import { render, screen } from "@testing-library/react";

import CoreFeatures from "@/app/components/CoreFeatures";
import FaqSection from "@/app/components/FaqSection";
import Footer from "@/app/components/Footer";
import Gallery from "@/app/components/Gallery";
import GalleryWall from "@/app/components/GalleryWall";
import Hero from "@/app/components/Hero";
import Testimonials from "@/app/components/Testimonials";

jest.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion-item">{children}</div>
  ),
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
  AccordionContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("static components", () => {
  it("renders CoreFeatures content", () => {
    render(<CoreFeatures />);

    expect(screen.getByText("Core Features")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
    expect(screen.getByText("Palette Variety")).toBeInTheDocument();
    expect(screen.getByText("Brain Models")).toBeInTheDocument();
    expect(screen.getByText("Easy to Access")).toBeInTheDocument();
  });

  it("renders FAQ section", () => {
    render(<FaqSection />);

    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("What is Nanobanana?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Nanobanana is an AI creative platform that turns your prompts into high-quality images and stylized visuals in seconds.",
      ),
    ).toBeInTheDocument();
  });

  it("renders Footer navigation and copyright", () => {
    render(<Footer />);

    expect(screen.getByText("Nanobanana")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "#about",
    );
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "href",
      "#gallery",
    );
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "#features",
    );
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "#pricing",
    );
    expect(
      screen.getByText("© 2024 Nanobanana. All rights reserved."),
    ).toBeInTheDocument();
  });

  it("renders Gallery items", () => {
    render(<Gallery />);

    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(6);
    expect(screen.getAllByText("View Art")).toHaveLength(6);
  });

  it("renders GalleryWall cards", () => {
    render(<GalleryWall />);

    expect(
      screen.getByText("Every creation includes the artist behind it."),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(8);
    expect(screen.getAllByRole("img")).toHaveLength(16);
    expect(screen.getByText("Skyline Drift")).toBeInTheDocument();
    expect(screen.getByText("@lenacreates")).toBeInTheDocument();
  });

  it("renders Hero layout", () => {
    render(<Hero />);

    expect(
      screen.getByText("Unleash Your Creativity with"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try for Free" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Explore Gallery/i }),
    ).toHaveAttribute("href", "#gallery");
    expect(screen.getAllByAltText("decoration")).toHaveLength(4);
  });

  it("renders Testimonials", () => {
    render(<Testimonials />);

    expect(screen.getByText("Testimonials")).toBeInTheDocument();
    expect(screen.getByText("Anna Borah")).toBeInTheDocument();
    expect(screen.getByText("Jennifer Shaner")).toBeInTheDocument();
    expect(screen.getByText("Mark Otto")).toBeInTheDocument();
  });
});
