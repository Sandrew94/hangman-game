import { HangManGame_View } from "../view/HangmanGame_View";
import { Validatable, validate } from "../components/validatable";

export class HangManGame_Value {
  constructor(public word: Promise<string | void>) {
    this.manipulatePromise(word);
  }

  manipulatePromise(word: Promise<string | void>) {
    word.then((data: any) => {
      const randomArrNum = Math.floor(Math.random() * (data.length + 1));

      data.map((_: string, idx: number, arr: string[]): undefined | string => {
        if (idx - 1 !== randomArrNum) return;
        console.log(arr[idx]);
        new HangManGame_View(arr[idx]);
        this.submitValue(arr[idx]);
        return arr[idx];
      });
    });
  }

  submitValue(inputString: string): void {
    const textInput = document.querySelector(
      ".label-letter"
    )! as HTMLInputElement;
    const formEl = document.querySelector("form")! as HTMLFormElement;
    ////
    let i = 0; //For errors
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      ////////////
      //Validation
      const inputValid: Validatable = {
        value: textInput.value,
        whiteSpace: true,
        maxLength: 1,
        allowNumber: false,
      };

      if (!validate(inputValid)) {
        alert("INSERT A VALID INPUT! MAX 1 VALUE - NO NUMBERS");
        return;
      }
      ////////////

      if (!this.compareString(textInput, inputString)) {
        i++;
        this.handleError(i);
        console.log(i);
      } else {
        this.compareString(textInput, inputString);
      }
    });
  }

  compareString(textInput: HTMLInputElement, inputString: string): boolean {
    const valueInput = textInput.value;
    console.log(valueInput);

    if (inputString.includes(valueInput)) {
      [...inputString].forEach((el: string, idx: number): void => {
        if (el === valueInput) {
          const dataTagWord = document.querySelector(
            `[data-tag="${idx}"]`
          )! as HTMLDataElement;
          dataTagWord.innerHTML = `${valueInput}`;
        }

        // const test = document.querySelector(".words_container-length");
        // console.log(test); add WINNING MESSAGE
      });

      return true;
    } else {
      return false;
    }
  }

  handleError(i: number): void {
    const handleError = [
      ".head",
      ".manbody",
      ".manbody_hands-right",
      ".manbody_hands-left",
      ".manbody_foot-right",
      ".manbody_foot-left",
    ];

    handleError.forEach((el: string, idx: number): void => {
      if (i === idx + 1) {
        HangManGame_View.wrongDigit(el);
      }
    });

    if (i === 7) {
      HangManGame_View.messageWinLose(
        "YOU LOOSE! CLICK THE BUTTON TO TRY AGAIN "
      );

      HangManGame_View.restartGame();
    }
  }
}
