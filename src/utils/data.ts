export const formatData = (data: number): string => {
    /**
     * Handle for negative values
     */
    return data >= 0
        ? data.toString().padStart(3, "0")
        : `-${Math.abs(data).toString().padStart(2, "0")}`;
};
