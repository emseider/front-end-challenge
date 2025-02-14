import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Actions from "./actions";

describe("Actions component", () => {
  const items = [
    { id: "1", label: "Item 1", onClick: vi.fn() },
    { id: "2", label: "Item 2", onClick: vi.fn() },
  ];

  it("renders the IconButton", () => {
    render(<Actions items={items} />);
    expect(screen.getByLabelText("more")).toBeInTheDocument();
  });

  it("opens the menu when IconButton is clicked", () => {
    render(<Actions items={items} />);
    fireEvent.click(screen.getByLabelText("more"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders the correct number of menu items", () => {
    render(<Actions items={items} />);
    fireEvent.click(screen.getByLabelText("more"));
    expect(screen.getAllByRole("menuitem")).toHaveLength(items.length);
  });

  it("calls the onClick handler when a menu item is clicked", () => {
    render(<Actions items={items} />);
    fireEvent.click(screen.getByLabelText("more"));
    fireEvent.click(screen.getByText("Item 1"));
    expect(items[0].onClick).toHaveBeenCalled();
  });

  it("closes the menu when a menu item is clicked", () => {
    render(<Actions items={items} />);
    fireEvent.click(screen.getByLabelText("more"));
    fireEvent.click(screen.getByText("Item 1"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
