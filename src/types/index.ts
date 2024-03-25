import { CELL_STATUS, LEVELS } from "../constants";

export type ValueOf<T> = T[keyof T];

export type Levels = ValueOf<typeof LEVELS>;

export interface Cell {
    value: number;
    status: ValueOf<typeof CELL_STATUS>;
}
