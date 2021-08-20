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

  //////////// max length
  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === "string"
  ) {
    isValid = isValid && validateInput.value.length <= validateInput.maxLength;
  }

  ///// allow numbers

  if (
    !validateInput.allowNumber &&
    !isNaN(parseFloat(validateInput.value)) &&
    isFinite(+validateInput.value)
  ) {
    //console.log("ci entra");
    isValid = isValid && false;
  }

  ////
  return isValid;
};
