export const LEVELS = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD"
} as const;

export const CELL_COUNTS = {
    [LEVELS.EASY]: {
        MAX_ROWS: 9,
        MAX_COLS: 9,
        MINES: 10
    },
    [LEVELS.MEDIUM]: {
        MAX_ROWS: 16,
        MAX_COLS: 16,
        MINES: 40
    },
    [LEVELS.HARD]: {
        MAX_ROWS: 16,
        MAX_COLS: 30,
        MINES: 99
    }
} as const;

export const CELL_STATUS = {
    UNREVEALED: "unrevealed",
    REVEALED: "revealed",
    FLAGGED: "flagged"
} as const;

export const CELL_VALUE = {
    MINE: -1,
    EMPTY: 0
} as const;
