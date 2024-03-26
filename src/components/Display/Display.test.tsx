import React from "react";
import { render, screen } from "@testing-library/react";

import Display from "./Display";

describe("Tests for display component", () => {
    it("Returns parsed display value", () => {
        render(<Display testId="mock-id" value={12} />);
        expect(screen.getByText("012")).toBeVisible();
    });
    it("Returns parsed negative display value", () => {
        render(<Display testId="mock-id" value={-1} />);
        expect(screen.getByText("-01")).toBeVisible();
    });
});
