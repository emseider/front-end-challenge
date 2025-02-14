import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Modal from "./modal";

describe("Modal component", () => {
  it("renders without crashing", () => {
    render(<Modal open={true} onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    const title = "Test Title";
    render(<Modal open={true} onClose={() => {}} title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    const children = <div>Test Children</div>;
    render(
      <Modal open={true} onClose={() => {}}>
        {children}
      </Modal>
    );
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = <button>Test Action</button>;
    render(<Modal open={true} onClose={() => {}} actions={actions} />);
    expect(screen.getByText("Test Action")).toBeInTheDocument();
  });

  it("calls onClose when Cancelar button is clicked", () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when open is false", () => {
    render(<Modal open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
