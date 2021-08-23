import { HangManGame_View } from "../view/HangmanGame_View";
import { Validatable, validate } from "../components/validatable";
import { removeDuplicateCharacters } from "./removeDuplicatedChar";

export class HangManGame_Value {
  constructor(public word: Promise<string | void>) {
    this.manipulatePromise(word);
    //Focus
    window.onload = function getfocus() {
      const focusInput = document.getElementById(
        "label-focus"
      )! as HTMLInputElement;
      focusInput.focus();
    };
  }

  manipulatePromise(word: Promise<string | void>) {
    word.then((data: any) => {
      const randomArrNum = Math.floor(Math.random() * (data.length + 1));

      data.map((_: string, idx: number, arr: string[]): undefined | string => {
        if (idx - 1 !== randomArrNum) return;
        console.log(arr[idx]);
        new HangManGame_View(arr[idx]); //Create html elements and inject them
        this.submitValue(arr[idx]); //Submit of the input field
        return arr[idx];
      });
    });
  }

  submitValue(inputString: string): void {
    const textInput = document.querySelector(
      ".label-letter"
    )! as HTMLInputElement;
    const formEl = document.querySelector("form")! as HTMLFormElement;
    //////
    let errors = 0; //Counter errors
    let winnerWord = 0; //Counter winners
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      ////////////
      //Validation for the input field
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
        errors++; //counter for error
        this.handleError(errors); //For each errors it appears an images of hangman
      } else {
        this.compareString(textInput, inputString);
        winnerWord++; //Counter for correct letters

        //Winning message
        if (winnerWord === removeDuplicateCharacters(inputString).length) {
          HangManGame_View.messageWinLose("YOU WIN!");

          HangManGame_View.restartGame();
        }
      }
    });
  }

  compareString(textInput: HTMLInputElement, inputString: string): boolean {
    const valueInput = textInput.value;

    if (inputString.includes(valueInput)) {
      [...inputString].forEach((el: string, idx: number): void => {
        if (el === valueInput) {
          const dataTagWord = document.querySelector(
            `[data-tag="${idx}"]`
          )! as HTMLDataElement;
          dataTagWord.innerHTML = `${valueInput}`;
        }
      });

      return true;
    } else {
      return false;
    }
  }

  handleError(errors: number): void {
    const handleError = [
      ".head",
      ".manbody",
      ".manbody_hands-right",
      ".manbody_hands-left",
      ".manbody_foot-right",
      ".manbody_foot-left",
    ];

    handleError.forEach((el: string, idx: number): void => {
      if (errors === idx + 1) {
        HangManGame_View.wrongDigit(el);
      }
    });

    if (errors === 7) {
      HangManGame_View.messageWinLose("YOU LOOSE!");

      HangManGame_View.restartGame();
    }
  }
}
