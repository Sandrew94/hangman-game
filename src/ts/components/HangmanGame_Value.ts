import { HangManGame_View } from "../view/HangmanGame_View";
import { validate } from "../components/validatable";
import { Validatable } from "../utils/exportTypes";
import { forEachType } from "../utils/exportTypes";

export class HangManGame_Value {
  private errors: number = 0; //Counter errors
  private winnerWord: number = 0; //Counter winners

  constructor(public word: Promise<string | void>) {
    this.manipulatePromise(word); //This input all the methods in the html
    //Focus on the input
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
        Math.random() * (data!.length + 1)
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
    formEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      ////////////
      //Validation for the input field
      //1- WHITE SPACE ALLOWED
      //2- MAX LENGTH 1
      //3- NO NUMBERS ALLOWED
      if (textInput.value === "") return; //No Empty string
      const inputValid: Validatable = {
        value: textInput.value,
        whiteSpace: true,
        maxLength: 1,
        allowNumber: false,
      };

      if (!validate(inputValid)) {
        return alert(
          "INSERT A VALID INPUT! MAX 1 VALUE - NO NUMBERS - NO WHITE SPACE"
        );
      }
      ////////////

      if (this.compareString(textInput, inputString)) {
        this.winnerWord++; //Counter for correct guessed word
        this.winningMethod(this.winnerWord, inputString, inputString); //Winning message
        ///////
        // Compare the letter in the input with the string that i need to guess
        this.compareString(textInput, inputString);
      } else {
        this.errors++; //counter for error
        this.handleError(this.errors, inputString); //For each errors it appears an images of hangman
        //Max 6 than game over
      }
      textInput.value = "";
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
    //se l'input ê uno spazio bianco ritornare FALSO invece che vero!!
    // Compare the letter in the input with the string that i need to guess
    if (inputString.includes(valueInput)) {
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

  private handleError(errors: number, correctWord: string): void {
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
      HangManGame_View.messageWinLose("YOU LOOSE!", correctWord);
      HangManGame_View.restartGame();
    }
  }

  private winningMethod(
    correctWordNumber: number,
    inputString: string,
    correctWord: string
  ) {
    if (correctWordNumber === this.removeDuplicateCharacters(inputString)) {
      HangManGame_View.messageWinLose("YOU WIN!", correctWord);
      HangManGame_View.restartGame();
    }
  }
}
