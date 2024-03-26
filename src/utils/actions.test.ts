import { CELL_STATUS, CELL_VALUE } from "../constants";

import {
    handleEmptyCellClick,
    revealAllMines,
    checkIsGameWon
} from "./actions";

describe("handleEmptyCellClick", () => {
    it("should reveal the current cell and adjacent empty cells", () => {
        const grid = [
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ]
        ];
        const rowParam = 1;
        const colParam = 1;

        const result = handleEmptyCellClick(grid, rowParam, colParam);

        expect(result[rowParam][colParam].status).toBe(CELL_STATUS.REVEALED);
        expect(result[0][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[0][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[0][2].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][2].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][2].status).toBe(CELL_STATUS.REVEALED);
    });

    it("should not reveal flagged cells", () => {
        const grid = [
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.FLAGGED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ]
        ];
        const rowParam = 0;
        const colParam = 0;

        const result = handleEmptyCellClick(grid, rowParam, colParam);

        expect(result[rowParam][colParam].status).toBe(CELL_STATUS.REVEALED);
        expect(result[0][1].status).toBe(CELL_STATUS.FLAGGED);
        expect(result[1][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][2].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][2].status).toBe(CELL_STATUS.REVEALED);
    });
});

describe("revealAllMines", () => {
    it("should reveal all mines in the grid", () => {
        const grid = [
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE }
            ]
        ];

        const result = revealAllMines(grid);

        expect(result[0][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[0][1].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[0][2].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][0].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[1][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][2].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[2][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][1].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[2][2].status).toBe(CELL_STATUS.REVEALED);
    });

    it("should not modify cells that are not mines", () => {
        const grid = [
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE }
            ],
            [
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.MINE },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY }
            ]
        ];

        const result = revealAllMines(grid);

        expect(result[0][0].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[0][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[0][2].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[1][0].status).toBe(CELL_STATUS.REVEALED);
        expect(result[1][1].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[1][2].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][0].status).toBe(CELL_STATUS.UNREVEALED);
        expect(result[2][1].status).toBe(CELL_STATUS.REVEALED);
        expect(result[2][2].status).toBe(CELL_STATUS.UNREVEALED);
    });
});

describe("checkIsGameWon", () => {
    it("should return true if all non-mine cells are revealed", () => {
        const grid = [
            [
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY }
            ]
        ];
        const maxRows = 3;
        const maxCols = 3;

        const result = checkIsGameWon(grid, maxRows, maxCols);

        expect(result.isGameWon).toBe(true);
    });

    it("should return false if there are unrevealed non-mine cells", () => {
        const grid = [
            [
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.UNREVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY }
            ],
            [
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY },
                { status: CELL_STATUS.REVEALED, value: CELL_VALUE.EMPTY }
            ]
        ];
        const maxRows = 3;
        const maxCols = 3;

        const result = checkIsGameWon(grid, maxRows, maxCols);

        expect(result.isGameWon).toBe(false);
    });
});
