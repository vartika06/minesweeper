import { render, screen } from "@testing-library/react";

import { Cell } from "../../types";

import Grid from "./Grid";
import { CELL_STATUS, CELL_VALUE } from "../../constants";

describe("Tests for Grid component", () => {
    const grid: Cell[][] = [
        [
            { status: CELL_STATUS.FLAGGED, value: CELL_VALUE.MINE },
            { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
        ],
        [
            { status: CELL_STATUS.UNREVEALED, value: 1 },
            { status: CELL_STATUS.FLAGGED, value: CELL_VALUE.MINE }
        ]
    ];
    const testId = "mock-id";
    const mineCoordinates: [number, number] = [1, 1];
    const handleCellClick = jest.fn();
    const handleFlagClick = jest.fn();

    it("Calls handleCellClick when a cell is clicked", () => {
        render(
            <Grid
                grid={grid}
                testId={testId}
                mineCoordinates={mineCoordinates}
                handleCellClick={handleCellClick}
                handleFlagClick={handleFlagClick}
            />
        );
        const cell = screen.getByTestId(`${testId}-cell-1-1`);
        cell.click();

        expect(handleCellClick).toHaveBeenCalledWith(1, 1);
    });

    it("Calls handleFlagClick when a cell is right-clicked", () => {
        render(
            <Grid
                grid={grid}
                testId={testId}
                mineCoordinates={mineCoordinates}
                handleCellClick={handleCellClick}
                handleFlagClick={handleFlagClick}
            />
        );
        const cell = screen.getByTestId(`${testId}-cell-0-0`);
        cell.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
        expect(handleFlagClick).toHaveBeenCalledWith(0, 0);
    });
});
