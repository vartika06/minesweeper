import React, { useState } from "react";

import getGrid from "../../utils/getGrid";
import { LEVELS } from "../../constants";
import SquareCell from "../SquareCell/SquareCell";
import { Cell } from "../../types";

const Grid = (): JSX.Element => {
    const [grid, setGrid] = useState<Cell[][]>(getGrid(LEVELS.EASY));

    return <GridCells grid={grid} />;
};

const GridCells = ({ grid }: { grid: Cell[][] }): JSX.Element => {
    return (
        <>
            {grid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => (
                    <SquareCell
                        key={`${rowIndex}-${colIndex}`}
                        row={rowIndex}
                        col={colIndex}
                        cell={cell}
                        testId={`cell-${rowIndex}-${colIndex}`}
                    />
                ));
            })}
        </>
    );
};

export default Grid;
