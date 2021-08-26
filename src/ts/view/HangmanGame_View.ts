import { HangManGame_Keyboard } from "./HangmanGame_keyboard";
import { forEachType } from "../utils/exportTypes";

export class HangManGame_View {
  private containerLetters: HTMLDivElement;
  static inputContainer: HTMLInputElement;

  constructor(public singleWord: string) {
    this.containerLetters = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;
    this.createHtmlKeyword(singleWord);

    ///////
    HangManGame_View.inputContainer = document.querySelector(
      ".input"
    )! as HTMLInputElement;

    new HangManGame_Keyboard();
  }

  public createHtmlKeyword(singleWord: string) {
    //Create an html span with dinamic data-tag from the word that comes from the API than push it in the HTML
    const singleLetter: forEachType = (_, idx) => {
      {
        let html = `<span class="words_container-length" data-tag="${idx}">*</span>`;
        this.containerLetters.insertAdjacentHTML("beforeend", html);
      }
    };

    [...singleWord].forEach(singleLetter);
  }

  static wrongDigit(htmlElementValue: string) {
    const hangman = document.querySelector(htmlElementValue)! as HTMLDivElement;
    hangman?.classList.remove("hidden");
  }

  static messageWinLose(text: string, correctWord: string): void {
    this.inputContainer.innerHTML = "";

    let html = `
    <div class="text_container">
          <span class="text_container-text">${text} -- The correct word is "${correctWord}"</span>
          <button class="text_container-btn">Click me to restart the game</button>
    </div>
    `;

    this.inputContainer.insertAdjacentHTML("beforeend", html);
  }

  static restartGame() {
    const btnRestart = document.querySelector(
      ".text_container-btn"
    )! as HTMLButtonElement;

    btnRestart.addEventListener("click", () => {
      location.reload();
    });
  }
}
