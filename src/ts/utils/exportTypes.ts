export type forEachType = (
  el: string,
  idx: number,
  arr: string[]
) => void | string | boolean;

///////

export interface Validatable {
  value: string;
  whiteSpace?: boolean;
  maxLength: number;
  allowNumber?: boolean;
}
