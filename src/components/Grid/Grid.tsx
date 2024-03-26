import SquareCell from "../SquareCell/SquareCell";
import { Cell } from "../../types";

interface GridProps {
    grid: Cell[][];
    testId: string;
    mineCoordinates: [number, number] | null;
    handleCellClick: (row: number, col: number) => void;
    handleFlagClick: (row: number, col: number) => void;
}

const Grid = ({
    grid,
    testId,
    mineCoordinates,
    handleCellClick,
    handleFlagClick
}: GridProps): JSX.Element => {
    return (
        <>
            {grid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => (
                    <SquareCell
                        key={`${rowIndex}-${colIndex}`}
                        row={rowIndex}
                        col={colIndex}
                        cell={cell}
                        isMineClick={
                            !!(
                                mineCoordinates &&
                                mineCoordinates[0] === rowIndex &&
                                mineCoordinates[1] === colIndex
                            )
                        }
                        handleCellClick={handleCellClick}
                        handleFlagClick={handleFlagClick}
                        testId={`${testId}-cell-${rowIndex}-${colIndex}`}
                    />
                ));
            })}
        </>
    );
};

export default Grid;
