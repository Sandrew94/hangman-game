import { HangManGame_Keyboard } from "./HangmanGame_keyboard";
import { forEachType } from "../utils/exportTypes";

export class HangManGame_View {
  constructor(public singleWord: string) {
    this.createHtmlKeyword(singleWord);
    new HangManGame_Keyboard();
  }

  createHtmlKeyword(singleWord: string) {
    const containerLetters = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;

    ////
    //Create an html span with dinamic data-tag from the word that comes from the API

    const singleLetter: forEachType = (_, idx) => {
      {
        let html = `<span class="words_container-length" data-tag="${idx}">*</span>`;
        containerLetters.insertAdjacentHTML("beforeend", html);
      }
    };

    [...singleWord].forEach(singleLetter);
  }

  static wrongDigit(htmlElementValue: string) {
    const hangman = document.querySelector(htmlElementValue)! as HTMLDivElement;
    hangman?.classList.remove("hidden");
  }

  static messageWinLose(text: string): void {
    const containerWord = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;
    containerWord.innerHTML = "";

    let html = `
    <div class="text_container">
          <span class="text_container-text">${text}</span>
          <button class="text_container-btn">Click me to restart the game</button>
    </div>
    `;

    containerWord.insertAdjacentHTML("beforeend", html);
  }

  static restartGame() {
    const btn = document.querySelector(
      ".text_container-btn"
    )! as HTMLButtonElement;

    btn.addEventListener("click", () => {
      location.reload();
    });
  }
}
