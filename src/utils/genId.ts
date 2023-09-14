export const genId = (length: number): string => {
    return Math.random().toString(36).slice(2, length + 2);
}