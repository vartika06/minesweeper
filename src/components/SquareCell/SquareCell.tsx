import React from "react";

import { Cell } from "../../types";
import { CELL_STATUS, CELL_VALUE } from "../../constants";

interface SquareProps {
    row: number;
    col: number;
    cell: Cell;
    testId: string;
}

const SquareCell = ({ testId, row, col, cell }: SquareProps): JSX.Element => {
    return (
        <div
            className={`cell ${cell.status} value-${cell.value}`}
            data-testid={testId}
        >
            <CellStatus cell={cell} />
        </div>
    );
};

const CellStatus = ({ cell }: { cell: Cell }): JSX.Element | null => {
    const { status, value } = cell;
    if (status === CELL_STATUS.REVEALED && value === CELL_VALUE.MINE) {
        return (
            <span role="img" aria-label="mine">
                💣
            </span>
        );
    } else if (status === CELL_STATUS.REVEALED) {
        /**
         * If cell is revealed and neither a mine nor empty then it contains the mine count
         */
        return <span>{value ? value : null}</span>;
    } else if (status === CELL_STATUS.FLAGGED) {
        return (
            <span role="img" aria-label="flag">
                🚩
            </span>
        );
    }

    return null;
};

export default SquareCell;
