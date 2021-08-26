import { HangManGame_View } from "../view/HangmanGame_View";
import { validate } from "../components/validatable";
import { Validatable } from "../utils/exportTypes";
import { forEachType } from "../utils/exportTypes";

export class HangManGame_Value {
  private errors: number = 0; //Counter errors
  private winnerWord: number = 0; //Counter winners
  private textInput: HTMLInputElement;
  private formEl: HTMLFormElement;
  ////////
  ///////

  get validationInput() {
    if (this.textInput.value === "") return; //No Empty string allowed
    /////////
    //Validation for the input field
    //1- WHITE SPACE NOT ALLOWED
    //2- MAX LENGTH 1
    //3- NO NUMBERS ALLOWED

    const inputValid: Validatable = {
      value: this.textInput.value,
      whiteSpace: true,
      maxLength: 1,
      allowNumber: false,
    };

    if (!validate(inputValid)) {
      return alert(
        "INSERT A VALID INPUT! MAX 1 VALUE - NO NUMBERS - NO WHITE SPACE"
      );
    }
  }

  constructor(public word: Promise<string | void>) {
    //ELEMENTS
    this.textInput = document.querySelector(
      ".label-letter"
    )! as HTMLInputElement;

    this.formEl = document.querySelector("form")! as HTMLFormElement;

    ///////////
    this.manipulatePromise(word); //This push all the methods in the html
    //////////
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
    this.formEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      ////////////
      this.validationInput; //Validate the input
      ////////////

      if (this.compareString(inputString)) {
        this.winnerWord++;
        this.winningMethod(inputString, inputString); //Winning message
        ///////
        // Compare the letter in the input with the string that i need to guess and replace the matched words
        this.compareString(inputString);
      } else {
        this.errors++;
        this.handleError(inputString); //For each errors it appears an images of hangman //Max 6 errors
      }
      this.textInput.value = "";
    });
  }

  public removeDuplicateCharacters(string: string): number {
    const splitString = string.split("");
    const filterString: forEachType = (item, pos, self) => {
      return self.indexOf(item) == pos;
    };
    return splitString.filter(filterString).join("").length;
  }

  private compareString(inputString: string): boolean {
    // Compare the letter in the input with the string that i need to guess
    if (inputString.includes(this.textInput.value)) {
      const checkWordCallback: forEachType = (el, idx): void => {
        if (el === this.textInput.value) {
          const dataTagWord = document.querySelector(
            `[data-tag="${idx}"]`
          )! as HTMLDataElement;

          if (!dataTagWord) return;
          dataTagWord.innerHTML = `${this.textInput.value}`;
        }
      };

      [...inputString].forEach(checkWordCallback);

      return true;
    } else {
      return false;
    }
  }

  private handleError(correctWord: string): void {
    const handleErrors: string[] = [
      ".head",
      ".manbody",
      ".manbody_hands-right",
      ".manbody_hands-left",
      ".manbody_foot-right",
      ".manbody_foot-left",
    ];

    const handleErrorCallback: forEachType = (el, idx): void => {
      if (this.errors === idx + 1) {
        HangManGame_View.wrongDigit(el!);
      }
    };

    handleErrors.forEach(handleErrorCallback);

    if (this.errors === 6) {
      HangManGame_View.messageWinLose("YOU LOOSE!", correctWord);
      HangManGame_View.restartGame();
    }
  }

  private winningMethod(inputString: string, correctWord: string) {
    if (this.winnerWord === this.removeDuplicateCharacters(inputString)) {
      HangManGame_View.messageWinLose("YOU WIN!", correctWord);
      HangManGame_View.restartGame();
    }
  }
}
