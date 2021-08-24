import { HangManGame_View } from "../view/HangmanGame_View";
import { validate } from "../components/validatable";
import { Validatable } from "../utils/exportTypes";
import { forEachType } from "../utils/exportTypes";

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

  private manipulatePromise(word: Promise<string | void>) {
    word.then((data: any) => {
      const randomArrNum: number = Math.floor(
        Math.random() * (data.length + 1)
      );

      const apiManipulation: forEachType = (_, idx, arr) => {
        if (idx - 1 !== randomArrNum) return;
        console.log(arr[idx]);
        new HangManGame_View(arr[idx]); //Create html elements and inject them
        this.submitValue(arr[idx]); //Submit of the input field
      };
      ////
      data.forEach(apiManipulation);
    });
  }

  private submitValue(inputString: string): void {
    const textInput = document.querySelector(
      ".label-letter"
    )! as HTMLInputElement;
    const formEl = document.querySelector("form")! as HTMLFormElement;
    //////
    let errors = 0; //Counter errors
    let winnerWord = 0; //Counter winners
    formEl.addEventListener("submit", (e: Event) => {
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
        alert(
          "INSERT A VALID INPUT! MAX 1 VALUE - NO NUMBERS - NO EMPTY SPACE"
        );
        return;
      }
      ////////////

      if (this.compareString(textInput, inputString)) {
        winnerWord++; //Counter for correct letters
        //Winning message
        this.winningMethod(winnerWord, inputString);
        this.compareString(textInput, inputString);
      } else {
        errors++; //counter for error
        this.handleError(errors); //For each errors it appears an images of hangman
      }
    });
  }

  public removeDuplicateCharacters(string: string): number {
    const splitString = string.split("");
    const filterString: forEachType = (item, pos, self) => {
      return self.indexOf(item) == pos;
    };
    return splitString.filter(filterString).join("").length;
  }

  private compareString(
    textInput: HTMLInputElement,
    inputString: string
  ): boolean {
    const valueInput = textInput.value;

    if (inputString.includes(valueInput)) {
      //
      const checkWordCallback: forEachType = (el, idx): void => {
        if (el === valueInput) {
          const dataTagWord = document.querySelector(
            `[data-tag="${idx}"]`
          )! as HTMLDataElement;

          if (!dataTagWord) return; //Guard clause
          dataTagWord.innerHTML = `${valueInput}`;
        }
      };

      [...inputString].forEach(checkWordCallback);

      return true;
    } else {
      return false;
    }
  }

  private handleError(errors: number): void {
    const handleError: string[] = [
      ".head",
      ".manbody",
      ".manbody_hands-right",
      ".manbody_hands-left",
      ".manbody_foot-right",
      ".manbody_foot-left",
    ];

    const handleErrorCallback: forEachType = (el, idx): void => {
      if (errors === idx + 1) {
        HangManGame_View.wrongDigit(el!);
      }
    };

    handleError.forEach(handleErrorCallback);

    if (errors === 6) {
      HangManGame_View.messageWinLose("YOU LOOSE!");
      HangManGame_View.restartGame();
    }
  }

  private winningMethod(correctWord: number, inputString: string) {
    if (correctWord === this.removeDuplicateCharacters(inputString)) {
      HangManGame_View.messageWinLose("YOU WIN!");
      HangManGame_View.restartGame();
    }
  }
}
