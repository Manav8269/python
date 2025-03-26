import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders calculator header", () => {
  render(<App />);
  expect(screen.getByText(/Calculator/i)).toBeInTheDocument();
});
