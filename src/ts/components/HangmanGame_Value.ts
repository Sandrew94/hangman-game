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

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.compareString(textInput, inputString);
    });
  }

  compareString(textInput: HTMLInputElement, inputString: string) {
    const valueInput = textInput.value;
    console.log(valueInput);
    if (inputString.includes(valueInput)) {
      Array.from(inputString).forEach((el, idx) => {
        if (el === valueInput) {
          const test = document.querySelector(
            `[data-tag="${idx}"]`
          )! as HTMLDataElement;
          test.innerHTML = `${valueInput}`;
        }
      });
    } else {
      console.log("error");
    }
  }
}
