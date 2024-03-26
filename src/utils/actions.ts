import { CELL_STATUS, CELL_VALUE } from "../constants";
import { Cell, Levels } from "../types";

import getGrid, { getNeighbourCells } from "./grid";

export const handleEmptyCellClick = (
    grid: Cell[][],
    rowParam: number,
    colParam: number
): Cell[][] => {
    const currentCell = grid[rowParam][colParam];

    if (
        currentCell.status === CELL_STATUS.REVEALED ||
        currentCell.status === CELL_STATUS.FLAGGED
    ) {
        return grid;
    }

    let newGrid = grid;
    newGrid[rowParam][colParam].status = CELL_STATUS.REVEALED;

    const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell
    } = getNeighbourCells(grid, rowParam, colParam);

    const neighbours = [
        { cell: topLeftCell, row: rowParam - 1, col: colParam - 1 },
        { cell: topCell, row: rowParam - 1, col: colParam },
        { cell: topRightCell, row: rowParam - 1, col: colParam + 1 },
        { cell: leftCell, row: rowParam, col: colParam - 1 },
        { cell: rightCell, row: rowParam, col: colParam + 1 },
        { cell: bottomLeftCell, row: rowParam + 1, col: colParam - 1 },
        { cell: bottomCell, row: rowParam + 1, col: colParam },
        { cell: bottomRightCell, row: rowParam + 1, col: colParam + 1 }
    ];

    neighbours.forEach(({ cell, row, col }) => {
        if (
            cell?.status === CELL_STATUS.UNREVEALED &&
            cell.value !== CELL_VALUE.MINE
        ) {
            if (cell.value === CELL_VALUE.EMPTY) {
                newGrid = handleEmptyCellClick(newGrid, row, col);
            } else {
                newGrid[row][col].status = CELL_STATUS.REVEALED;
            }
        }
    });

    return newGrid;
};

export const revealAllMines = (grid: Cell[][]): Cell[][] => {
    const newGrid = grid.map((row) =>
        row.map((cell) => {
            if (cell.value === CELL_VALUE.MINE) {
                return {
                    ...cell,
                    status: CELL_STATUS.REVEALED
                };
            }
            return cell;
        })
    );

    return newGrid;
};

export const checkIsGameWon = (
    grid: Cell[][],
    maxRows: number,
    maxCols: number
): { isGameWon: boolean } => {
    let isGameWon = true;
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            const cell = grid[i][j];
            if (
                cell.value !== CELL_VALUE.MINE &&
                cell.status === CELL_STATUS.UNREVEALED
            ) {
                isGameWon = false;
                break;
            }
        }
    }

    return { isGameWon };
};

export const flagAllMines = (grid: Cell[][]): Cell[][] => {
    const newGrid = grid.map((row) =>
        row.map((cell) => {
            if (cell.value === CELL_VALUE.MINE) {
                return {
                    ...cell,
                    status: CELL_STATUS.FLAGGED
                };
            }
            return cell;
        })
    );

    return newGrid;
};

export const handleFirstMineCell = (
    grid: Cell[][],
    row: number,
    col: number,
    level: Levels
): Cell[][] => {
    let newGrid = grid;
    let isMine = grid[row][col].value === CELL_VALUE.MINE;
    while (isMine) {
        newGrid = getGrid(level);
        isMine = newGrid[row][col].value === CELL_VALUE.MINE;
    }
    return newGrid;
};
