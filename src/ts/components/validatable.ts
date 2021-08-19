export interface Validatable {
  value: string;
  whiteSpace?: boolean;
  maxLength: number;
  allowNumber?: boolean;
}

export const validate = function (validateInput: Validatable) {
  let isValid = true;

  //////////// whiteSpace check
  if (validateInput.whiteSpace) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }

  ///// allow numbers
  if (!validateInput.allowNumber && typeof +validateInput.value === "number") {
    isValid = isValid && typeof validateInput.value === "number";
  }

  //////////// max length
  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === "string"
  ) {
    isValid = isValid && validateInput.value.length <= validateInput.maxLength;
  }

  ////
  return isValid;
};
