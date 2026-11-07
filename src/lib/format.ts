/** 1 → "01" */
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Post-style counter: (2, 8) → "02/08" */
export const counter = (index: number, total: number) => `${pad2(index)}/${pad2(total)}`;
