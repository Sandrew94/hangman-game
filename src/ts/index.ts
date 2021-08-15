import "../scss/main.scss";
import { takeAPIWord } from "./components/asyncRequest";

class HangManGame {
  constructor(public word: Promise<string | void>) {
    word.then((data: any) => {
      const randomArrNum = Math.floor(Math.random() * (data.length + 1));

      data.map((_: string, idx: number, arr: string[]): undefined | string => {
        if (idx - 1 !== randomArrNum) return;
        console.log(arr[idx]);
        this.createHtmlKeyword(arr[idx]);
        this.compareValue(arr[idx]);
        return arr[idx];
      });
    });
  }

  createHtmlKeyword(singleWord: string) {
    const containerLetters = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;

    Array.from(singleWord).forEach((_) => {
      let html = `<span class="words_container-length">*</span>`;
      containerLetters.insertAdjacentHTML("beforeend", html);
    });
  }

  compareValue(inputString: string) {
    const textInput = document.querySelector(
      ".label-letter"
    )! as HTMLInputElement;

    textInput.addEventListener("change", () => {
      const valueInput = textInput.value;
      console.log(valueInput);
      if (inputString.includes(valueInput)) console.log("it's works");
    });
  }
}

const randomWord = takeAPIWord(20);
new HangManGame(randomWord);
