import { HangManGame_View } from "../view/HangmanGame_View";

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

  submitValue(inputString: string) {
    const textInput = document.querySelector(
      ".label-letter"
    )! as HTMLInputElement;
    const formEl = document.querySelector("form")! as HTMLFormElement;
    ////
    let i = 0;
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.compareString(textInput, inputString)) {
        i++;
        console.log(i);
        const handleError = [
          ".head",
          ".manbody",
          ".manbody_hands-right",
          ".manbody_hands-left",
          ".manbody_foot-right",
          ".manbody_foot-left",
        ];

        handleError.forEach((el, idx) => {
          if (i === idx + 1) {
            HangManGame_View.wrongDigit(el);
          }
        });

        if (i === 7) {
          console.log("display a FAIL GAME WRITE");
          console.log("create button that generate a new game");
        }
      } else {
        this.compareString(textInput, inputString);
      }
    });
  }

  compareString(textInput: HTMLInputElement, inputString: string) {
    const valueInput = textInput.value;
    console.log(valueInput);

    if (inputString.includes(valueInput)) {
      Array.from(inputString).forEach((el: string, idx: number) => {
        if (el === valueInput) {
          const dataTagWord = document.querySelector(
            `[data-tag="${idx}"]`
          )! as HTMLDataElement;
          dataTagWord.innerHTML = `${valueInput}`;
        }
      });
    } else {
      return false;
    }
    return true;
  }

  handleError() {}

  checkInput() {}
}
