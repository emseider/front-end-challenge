import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Status from "./statusTag";
import { StatusEnum } from "../../types";

describe("Status component", () => {
  it("renders with 'Pagado' label and 'success' color when status is 'Paid'", () => {
    const { getByText } = render(<Status status={StatusEnum.Paid} />);
    const chip = getByText("Pagado");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass(
      "MuiChip-label MuiChip-labelMedium css-1dybbl5-MuiChip-label"
    );
  });

  it("renders with 'Pendente' label and 'warning' color when status is 'Pending'", () => {
    const { getByText } = render(<Status status={StatusEnum.Pending} />);
    const chip = getByText("Pendente");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass(
      "MuiChip-label MuiChip-labelMedium css-1dybbl5-MuiChip-label"
    );
  });

  it("renders with 'Vencido' label and 'error' color when status is 'Overdue'", () => {
    const { getByText } = render(<Status status={StatusEnum.Overdue} />);
    const chip = getByText("Vencido");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass(
      "MuiChip-label MuiChip-labelMedium css-1dybbl5-MuiChip-label"
    );
  });

  it("renders with the status label and 'default' color when status is unknown", () => {
    const { getByText } = render(<Status status="Unknown" />);
    const chip = getByText("Unknown");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass("MuiChip-label");
  });
});
