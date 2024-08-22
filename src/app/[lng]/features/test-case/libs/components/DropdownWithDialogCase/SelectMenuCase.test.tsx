import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { DropdownWithDialogCase } from "./DropdownWithDialogCase";

describe("SelectMenuCase test", () => {
  test("unit test1", () => {
    render(<DropdownWithDialogCase />);

    expect(screen.getByText("下拉")).toBeInTheDocument();
  });
});
