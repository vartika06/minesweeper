import { Cell } from "../../types";
import { CELL_STATUS, CELL_VALUE } from "../../constants";

interface SquareProps {
    row: number;
    col: number;
    cell: Cell;
    handleCellClick: (row: number, col: number) => void;
    handleFlagClick: (row: number, col: number) => void;
    isMineClick?: boolean;
    testId: string;
}

const SquareCell = ({
    testId,
    row,
    col,
    cell,
    isMineClick = false,
    handleCellClick,
    handleFlagClick
}: SquareProps): JSX.Element => {
    return (
        <div
            className={`cell ${cell.status} value-${cell.value} ${isMineClick ? "red" : ""} `}
            data-testid={testId}
            role="button"
            tabIndex={0}
            onClick={() => handleCellClick(row, col)}
            onContextMenu={(event) => {
                event.preventDefault();
                handleFlagClick(row, col);
            }}
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
