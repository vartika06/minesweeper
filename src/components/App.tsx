import { useEffect, useState } from "react";

import {
    CELL_COUNTS,
    CELL_STATUS,
    CELL_VALUE,
    GAME_STATUS,
    LEVELS,
    MAX_TIME_IN_SECONDS,
    STATUS_FACE,
    TIMER_INTERVAL_IN_MS
} from "../constants";
import { Cell } from "../types";
import getGrid from "../utils/grid";
import {
    checkIsGameWon,
    flagAllMines,
    handleEmptyCellClick,
    handleFirstMineCell,
    revealAllMines
} from "../utils/actions";

import Display from "./Display/Display";
import Status from "./Status/Status";
import Grid from "./Grid/Grid";

const App = (): JSX.Element => {
    const [selectedLevel, setSelectedLevel] = useState<keyof typeof LEVELS>(
        LEVELS.EASY
    );
    const [grid, setGrid] = useState<Cell[][]>(getGrid(LEVELS.EASY));
    const [status, setStatus] = useState<keyof typeof STATUS_FACE>(
        GAME_STATUS.PLAYING
    );
    const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [totalFlags, setTotalFlags] = useState<number>(
        CELL_COUNTS[LEVELS.EASY].MINES
    );
    const [mineCoordinates, setMineCoordinates] = useState<
        [number, number] | null
    >(null);
    const [isGameLost, setIsGameLost] = useState(false);

    useEffect(() => {
        const onMouseDown = () => {
            if (!isGameLost) {
                setStatus(GAME_STATUS.LOADING);
            }
        };
        const onMouseUp = () => {
            if (!isGameLost) {
                setStatus(GAME_STATUS.PLAYING);
            }
        };

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [isGameLost]);

    useEffect(() => {
        if (hasGameStarted && timeElapsed < MAX_TIME_IN_SECONDS) {
            const interval = setInterval(() => {
                setTimeElapsed((timeElapsed) => timeElapsed + 1);
            }, TIMER_INTERVAL_IN_MS);
            return () => clearInterval(interval);
        }
    }, [hasGameStarted, timeElapsed]);

    const handleCellClick = (row: number, col: number): void => {
        console.log("handleCellClick", status);
        if (isGameLost) {
            return;
        }
        let currentCell = grid[row][col];
        let newGrid = grid;
        /**
         * If first click was a flag then game won't start
         */
        if (!hasGameStarted) {
            /**
             * First click can't be a mine
             */
            if (currentCell.value === CELL_VALUE.MINE) {
                newGrid = handleFirstMineCell(newGrid, row, col);
                currentCell = newGrid[row][col];
            }
            setHasGameStarted(true);
        }

        /**
         * Nothing should happen -
         * - if a flagged cell or already revealed cell is clicked
         */
        if (currentCell.status !== CELL_STATUS.UNREVEALED) {
            return;
        }

        if (currentCell.value === CELL_VALUE.MINE) {
            newGrid = revealAllMines(newGrid);
            setMineCoordinates([row, col]);
            setHasGameStarted(false);
            setStatus(GAME_STATUS.DEAD);
            setIsGameLost(true);
            setGrid(newGrid);
            return;
        } else if (currentCell.value === CELL_VALUE.EMPTY) {
            newGrid = handleEmptyCellClick(newGrid, row, col);
        } else {
            newGrid[row][col].status = CELL_STATUS.REVEALED;
        }

        /**
         * Check if all cells are revealed except mines
         */
        const { isGameWon } = checkIsGameWon(
            newGrid,
            CELL_COUNTS[LEVELS.EASY].MAX_ROWS,
            CELL_COUNTS[LEVELS.EASY].MAX_COLS
        );

        if (isGameWon) {
            newGrid = flagAllMines(newGrid);
            setHasGameStarted(false);
            setStatus(GAME_STATUS.WON);
        }
        setGrid(newGrid);
    };

    console.log("status", status);

    const handleFlagClick = (row: number, col: number): void => {
        if (isGameLost) {
            return;
        }
        const currentCell = grid[row][col];
        const newGrid = grid;
        /**
         * Cell is flagged only if the value of the cell is not revealed yet
         */
        if (currentCell.status === CELL_STATUS.UNREVEALED) {
            newGrid[row][col].status = CELL_STATUS.FLAGGED;
            setTotalFlags(totalFlags - 1);
        } else if (currentCell.status === CELL_STATUS.FLAGGED) {
            newGrid[row][col].status = CELL_STATUS.UNREVEALED;
            setTotalFlags(totalFlags + 1);
        }
        setGrid(newGrid);
    };

    const handleFaceClick = (): void => {
        /**
         * Reset the entire game
         */
        setStatus(GAME_STATUS.PLAYING);
        setHasGameStarted(false);
        setTimeElapsed(0);
        setGrid(getGrid(LEVELS.EASY));
        setTotalFlags(CELL_COUNTS[LEVELS.EASY].MINES);
        setMineCoordinates(null);
        setIsGameLost(false);
    };

    return (
        <>
            <div className="level-selector">
                {Object.keys(LEVELS).map((level) => (
                    <div key={level}>
                        <input
                            type="radio"
                            id={level}
                            name={level}
                            value={level}
                            checked={
                                selectedLevel ===
                                LEVELS[level as keyof typeof LEVELS]
                            }
                            onChange={() =>
                                setSelectedLevel(
                                    LEVELS[level as keyof typeof LEVELS]
                                )
                            }
                        />
                        <label htmlFor={level}>{level}</label>
                    </div>
                ))}
            </div>
            <div className="minesweeper">
                <div className="header">
                    <Display testId="flags-display" value={totalFlags} />
                    <Status
                        status={status}
                        handleFaceClick={handleFaceClick}
                        testId="face-status"
                    />
                    <Display testId="minesweeper-timer" value={timeElapsed} />
                </div>
                <div className="content">
                    <Grid
                        grid={grid}
                        testId="minesweeper-grid"
                        mineCoordinates={mineCoordinates}
                        handleCellClick={handleCellClick}
                        handleFlagClick={handleFlagClick}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
