import { render, screen } from "@testing-library/react";

import { CELL_STATUS, CELL_VALUE } from "../../constants";
import { Cell } from "../../types";

import SquareCell from "./SquareCell";

describe("Tests for SquareCell component", () => {
    it("Renders mine emoji when cell status is revealed and value is mine", () => {
        const clickMock = jest.fn();
        const rightClickMock = jest.fn();
        const cell: Cell = {
            status: CELL_STATUS.REVEALED,
            value: CELL_VALUE.MINE
        };
        render(
            <SquareCell
                cell={cell}
                row={1}
                col={1}
                handleCellClick={clickMock}
                handleFlagClick={rightClickMock}
                testId="mock-cell"
            />
        );
        expect(screen.getByLabelText("mine")).toBeInTheDocument();
    });

    it("Renders mine count when cell status is revealed and value is not mine", () => {
        const cell: Cell = {
            status: CELL_STATUS.REVEALED,
            value: 3
        };
        render(
            <SquareCell
                cell={cell}
                row={1}
                col={1}
                handleCellClick={jest.fn()}
                handleFlagClick={jest.fn()}
                testId="mock-cell"
            />
        );
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("Renders flag emoji when cell status is flagged", () => {
        const cell: Cell = {
            status: CELL_STATUS.FLAGGED,
            value: 4
        };
        render(
            <SquareCell
                cell={cell}
                row={1}
                col={1}
                handleCellClick={jest.fn()}
                handleFlagClick={jest.fn()}
                testId="mock-cell"
            />
        );
        expect(screen.getByLabelText("flag")).toBeInTheDocument();
    });

    it("Does not render anything when cell status is not revealed or flagged", () => {
        const cell: Cell = {
            status: CELL_STATUS.UNREVEALED,
            value: 3
        };
        render(
            <SquareCell
                cell={cell}
                row={1}
                col={1}
                handleCellClick={jest.fn()}
                handleFlagClick={jest.fn()}
                testId="mock-cell"
            />
        );
        expect(screen.queryByLabelText("mine")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("flag")).not.toBeInTheDocument();
        expect(screen.queryByText("3")).not.toBeInTheDocument();
    });
});
