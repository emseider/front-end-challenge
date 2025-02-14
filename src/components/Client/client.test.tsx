import { render, screen } from "@testing-library/react";
import Client from "./client";
import { describe, it, expect } from "vitest";

describe("Client component", () => {
  it("renders the client's name and invoice number", () => {
    render(<Client name="John Doe" invoiceNumber="INV-12345" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("INV-12345")).toBeInTheDocument();
  });

  it("renders the initial of the client's name in the avatar", () => {
    render(<Client name="John Doe" invoiceNumber="INV-12345" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("applies the default color to the avatar if no color is provided", () => {
    render(<Client name="John Doe" invoiceNumber="INV-12345" />);
    const avatar = screen.getByText("J").closest("div");
    expect(avatar).toHaveStyle("background-color: rgb(128, 128, 128)"); // gray in rgb
  });

  it("applies the provided color to the avatar", () => {
    render(<Client name="John Doe" invoiceNumber="INV-12345" color="blue" />);
    const avatar = screen.getByText("J").closest("div");
    expect(avatar).toHaveStyle("background-color: rgb(0, 0, 255)"); // blue in rgb
  });
});
