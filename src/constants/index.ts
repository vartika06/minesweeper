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

export const GAME_STATUS = {
    PLAYING: "PLAYING",
    DEAD: "DEAD",
    WON: "WON",
    LOADING: "LOADING"
} as const;

export const STATUS_FACE = {
    [GAME_STATUS.PLAYING]: "😀",
    [GAME_STATUS.DEAD]: "😔",
    [GAME_STATUS.WON]: "😎",
    [GAME_STATUS.LOADING]: "😮"
} as const;

export const TIMER_INTERVAL_IN_MS = 1000;
export const MAX_TIME_IN_SECONDS = 999;
