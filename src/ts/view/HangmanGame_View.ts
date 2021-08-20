export class HangManGame_View {
  constructor(public singleWord: string) {
    this.createHtmlKeyword(singleWord);
  }

  createHtmlKeyword(singleWord: string) {
    const containerLetters = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;

    [...singleWord].forEach((_, idx) => {
      let html = `<span class="words_container-length" data-tag="${idx}">*</span>`;
      containerLetters.insertAdjacentHTML("beforeend", html);
    });
  }

  static wrongDigit(htmlElement: string) {
    const hangman = document.querySelector(htmlElement)! as HTMLDivElement;
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
