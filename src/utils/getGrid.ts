import { CELL_COUNTS, CELL_STATUS, CELL_VALUE } from "../constants";
import { Cell, Levels } from "../types";

const getGrid = (level: Levels): Cell[][] => {
    const grid: Cell[][] = [];

    const { MAX_COLS, MAX_ROWS, MINES } = CELL_COUNTS[level];

    for (let row = 0; row < MAX_ROWS; row++) {
        let rowArray: Cell[] = [];
        for (let col = 0; col < MAX_COLS; col++) {
            rowArray.push({
                value: CELL_VALUE.EMPTY,
                status: CELL_STATUS.UNREVEALED
            });
        }
        grid.push(rowArray);
    }

    const minedGrid = getMinedGrid({
        grid,
        maxCols: MAX_COLS,
        maxRows: MAX_ROWS,
        totalMines: MINES
    });

    return getAdjacentMinesCount(minedGrid, MAX_ROWS, MAX_COLS);
};

const getMinedGrid = ({
    grid,
    maxCols,
    maxRows,
    totalMines
}: {
    grid: Cell[][];
    maxRows: number;
    maxCols: number;
    totalMines: number;
}): Cell[][] => {
    let mines = 0;
    let minedGrid = grid;
    while (mines < totalMines) {
        const mineRow = Math.floor(Math.random() * maxRows);
        const mineCol = Math.floor(Math.random() * maxCols);

        if (minedGrid[mineRow][mineCol].value !== CELL_VALUE.MINE) {
            minedGrid[mineRow][mineCol].value = CELL_VALUE.MINE;
            mines++;
        }
    }

    return minedGrid;
};

const getAdjacentMinesCount = (
    minedGrid: Cell[][],
    maxRows: number,
    maxCols: number
): Cell[][] => {
    let gridWithMineCounts = minedGrid;

    for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col < maxCols; col++) {
            if (minedGrid[row][col].value !== CELL_VALUE.MINE) {
                const {
                    topLeftCell,
                    topCell,
                    topRightCell,
                    leftCell,
                    rightCell,
                    bottomLeftCell,
                    bottomCell,
                    bottomRightCell
                } = grabAdjacentCells(minedGrid, row, col);

                const adjacentCells = [
                    topLeftCell,
                    topCell,
                    topRightCell,
                    leftCell,
                    rightCell,
                    bottomLeftCell,
                    bottomCell,
                    bottomRightCell
                ];
                const mineCount = adjacentCells.reduce(
                    (count, cell) =>
                        cell?.value === CELL_VALUE.MINE ? count + 1 : count,
                    0
                );

                if (mineCount > 0) {
                    gridWithMineCounts[row][col].value = mineCount;
                }
            }
        }
    }

    return gridWithMineCounts;
};

const grabAdjacentCells = (
    cells: Cell[][],
    rowIndex: number,
    colIndex: number
): {
    topLeftCell: Cell | null;
    topCell: Cell | null;
    topRightCell: Cell | null;
    leftCell: Cell | null;
    rightCell: Cell | null;
    bottomLeftCell: Cell | null;
    bottomCell: Cell | null;
    bottomRightCell: Cell | null;
} => {
    const topLeftCell = cells[rowIndex - 1]?.[colIndex - 1] || null;
    const topCell = cells[rowIndex - 1]?.[colIndex] || null;
    const topRightCell = cells[rowIndex - 1]?.[colIndex + 1] || null;
    const leftCell = cells[rowIndex]?.[colIndex - 1] || null;
    const rightCell = cells[rowIndex]?.[colIndex + 1] || null;
    const bottomLeftCell = cells[rowIndex + 1]?.[colIndex - 1] || null;
    const bottomCell = cells[rowIndex + 1]?.[colIndex] || null;
    const bottomRightCell = cells[rowIndex + 1]?.[colIndex + 1] || null;

    return {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell
    };
};

export default getGrid;
